"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _department = require("../models/department");

var _department2 = _interopRequireDefault(_department);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.department_list = function (req, res) {
  // const offset = req.query._offset ? parseInt(req.query._offset, 10) : 0;
  // let limit = req.query._limit ? parseInt(req.query._limit, 10) : 20;


  // if (limit > 50) limit = 50;
  // const cursor = Department.find(filter).sort({
  //   createdAt: -1
  // }).skip(offset).limit(limit);

  // // ensures that the effects of skip() and limit() will be ignored
  // cursor.exec().then(emploees => {
  //   Department.count().then(totalCount => {
  //     res.json({
  //       metadata: {
  //         totalCount
  //       },
  //       records: emploees
  //     });
  //   });
  // }).catch(error => {
  //   console.log(error);
  //   res.status(500).json({
  //     message: `Internal Server Error: ${error}`
  //   });
  // });
  _department2.default.find().then(departments => {
    res.json({
      departments
    });
  }).catch(err => {
    res.status(500).json({
      message: `Internal Server Error: ${err}`
    });
  });
};
exports.department_create = function (req, res) {
  const department = req.body;

  var newDepartment = new _department2.default(department);
  newDepartment.save().then(savedDepartment => {
    res.json(savedDepartment);
  }).catch(error => {
    console.log(error);
    res.status(500).json({
      message: `Internal Server Error: ${error}`
    });
  });
};
exports.department_update = function (req, res) {};
//# sourceMappingURL=department.js.map