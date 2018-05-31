var express = require('express');
var router = express.Router();

var userController = require('../controllers/user');


/* GET userController listing. */
router.get('/', function (req, res, next) {
  userController.list(req, res, next);
  //res.end(userController.list);
});
router.post('/', function (req, res, next) {
  userController.create(req, res, next);
});


// Set up the 'userController' parameterized routes
router.get('/:userId', function (req, res) {
  userController.read(req, res);
  //res.send("update");
})
router.put('/:userId', function (req, res) {
  userController.update(req, res);
  //res.send("read");
})
router.delete('/:userId', function (req, res) {
  userController.delete(req, res);
  //  res.send("delete");
})


module.exports = router;
