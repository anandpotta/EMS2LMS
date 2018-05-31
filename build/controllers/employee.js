'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _employee = require('../models/employee');

var _employee2 = _interopRequireDefault(_employee);

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getAggreateMatchedIds = result => {
  let ids = [];
  for (let i = 0; i < result.length; i++) {
    ids.push(result[i]._id);
  }
  return ids;
};
const getSearchReg = search => {
  var terms = search.split(' ');

  var regexString = "";

  for (var i = 0; i < terms.length; i++) {
    regexString += terms[i];
    if (i < terms.length - 1) regexString += '|';
  }

  return new RegExp(regexString, 'ig');
};
const search = (req, res, filter) => {
  const offset = req.query._offset ? parseInt(req.query._offset, 10) : 0;
  let limit = req.query._limit ? parseInt(req.query._limit, 10) : 20;

  console.log('offset', offset);
  console.log('limit', limit);
  console.log('filter', filter);

  if (limit > 50) limit = 50;
  const cursor = _employee2.default.find(filter).sort({
    createdAt: -1
  }).skip(offset).limit(limit);

  // ensures that the effects of skip() and limit() will be ignored
  cursor.exec().then(emploees => {
    _employee2.default.count().then(totalCount => {
      res.json({
        metadata: {
          totalCount
        },
        records: emploees
      });
    });
  }).catch(error => {
    console.log(error);
    res.status(500).json({
      message: `Internal Server Error: ${error}`
    });
  });
};
// TODO: should implement range pagination instead of using skip to result in better server performance
exports.employee_list = function (req, res) {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.effort_lte || req.query.effort_gte) filter.effort = {};
  if (req.query.effort_lte) filter.effort.$lte = parseInt(req.query.effort_lte, 10);
  if (req.query.effort_gte) filter.effort.$gte = parseInt(req.query.effort_gte, 10);

  if (req.query._summary === undefined) {
    if (req.query.search) {

      _employee2.default.aggregate().project({
        fullname: {
          $concat: ['$name.firstName', ' ', '$name.lastName']
        }
      }).match({
        fullname: new RegExp(req.query.search, 'ig')
      }).exec().then(results => {
        console.log('results', getSearchReg(req.query.search));
        const ids = getAggreateMatchedIds(results);
        if (ids.length > 0) filter._id = {
          $in: ids
        };
        search(req, res, filter);
      });
    } else search(req, res, filter);
  } else {
    console.log('doing aggregation', filter);
    _employee2.default.aggregate([{
      $match: filter
    }, {
      $group: {
        _id: {
          name: '$owner',
          createdAt: '$createdAt'
        },
        count: {
          $sum: 1
        }
      }
    }]).exec().then(results => {
      const stats = {};
      results.forEach(result => {
        if (!stats[result._id.owner]) stats[result._id.owner] = {};
        stats[result._id.owner][result._id.status] = result.count;
      });
      res.json(stats);
    }).catch(error => {
      console.log(error);
      res.status(500).json({
        message: `Internal Server Error: ${error}`
      });
    });
  }
};

exports.employee_create = function (req, res) {
  const newEmployee = req.body;
  newEmployee.created = new Date();
  if (!newEmployee.status) {
    newEmployee.status = 'New';
  }

  var newUser = new _employee2.default(newEmployee);
  newUser.save().then(savedEmployee => {
    res.json(savedEmployee);
  }).catch(error => {
    console.log(error);
    res.status(500).json({
      message: `Internal Server Error: ${error}`
    });
  });
};

exports.employee_bulk_delete = function (req, res) {
  let docIds = req.body.docIds;
  try {
    docIds = docIds.map(id => _mongoose2.default.Types.ObjectId(id));
  } catch (error) {
    res.status(422).json({
      message: `Invalid issue ID format: ${error}`
    });
    return;
  }

  _employee2.default.deleteMany({
    _id: {
      '$in': docIds
    }
  }).then(deleteResult => {
    console.log('deleteResult', deleteResult.result);
    if (deleteResult.result.n === docIds.length) res.json({
      status: 'OK'
    });else res.json({
      status: 'Warning: object not found'
    });
  }).catch(error => {
    console.log(error);
    res.status(500).json({
      message: `Internal Server Error: ${error}`
    });
  });
};

// Get employee detail
exports.employee_detail = function (req, res) {
  let documentId;
  try {
    documentId = _mongoose2.default.Types.ObjectId(req.params.id);
  } catch (error) {
    console.log('error', error);
    res.status(422).json({
      message: `Invalid issue ID format: ${error}`
    });
    return;
  }

  _employee2.default.findOne({
    _id: documentId
  }).then(employee => {
    if (!employee) res.status(404).json({
      message: `No such employee: ${documentId}`
    });else res.json(employee);
  }).catch(error => {
    console.log(error);
    res.status(500).json({
      message: `Internal Server Error: ${error}`
    });
  });
};

const handleError = (error, res) => {
  console.error(error);
  return res.status(500).json({
    message: `Internal Server Error: ${error}`
  });
};
// update employee
exports.employee_update = function (req, res) {
  let _id;
  try {
    _id = _mongoose2.default.Types.ObjectId(req.params.id);
  } catch (error) {
    return res.status(422).json({
      message: `Invalid issue ID format: ${error}`
    });
  }

  const employee = req.body;
  employee.updatedAt = new Date();

  _employee2.default.findOneAndUpdate({
    "_id": _id
  }, {
    "$set": employee
  }, {
    new: true
  }, function (err, updatedEmployee) {
    if (err) return handleError(err, res);
    res.json(updatedEmployee);
  });
};

// delete employee
exports.employee_delete = function (req, res) {
  console.log('employee_delete', req.params.id);
  let docId;
  try {
    docId = _mongoose2.default.Types.ObjectId(req.params.id);
  } catch (error) {
    return res.status(422).json({
      message: `Invalid issue ID format: ${error}`
    });
  }
  _employee2.default.deleteOne({
    _id: docId
  }).then(deleteResult => {
    if (deleteResult.result.n === 1) res.json({
      status: 'OK'
    });else res.json({
      status: 'Warning: object not found'
    });
  }).catch(error => {
    console.log(error);
    res.status(500).json({
      message: `Internal Server Error: ${error}`
    });
  });
};

exports.generate_employees = function (req, res) {
  var gender = ['Male', 'Female'];
  var employees = [];
  for (var i = 0; i < 1000; i++) {
    var firstName = _faker2.default.name.firstName();
    var lastName = _faker2.default.name.lastName();
    var title = _faker2.default.name.jobTitle();
    var department = _faker2.default.commerce.department();
    var randomGender = gender[Math.floor(Math.random() * 2)];
    var randomEmail = _faker2.default.internet.email(); // Rusty@arne.info
    var randomDate = _faker2.default.date.recent();

    var employee = {
      name: {
        firstName,
        lastName
      },
      gender: randomGender,
      email: randomEmail,
      title: title,
      department: department,
      createdAt: randomDate
    };
    employees.push(employee);
  }
  _employee2.default.insertMany(employees).then(docs => {
    res.json({
      docs
    });
  }).catch(error => {
    console.error(`error: ${error}`);
  });
};
//# sourceMappingURL=employee.js.map