'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _employee = require('../controllers/employee');

var _employee2 = _interopRequireDefault(_employee);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

router.get('/generate', _employee2.default.generate_employees);

router.get('/', _employee2.default.employee_list);
router.post('/', _employee2.default.employee_create);
router.delete('/', _employee2.default.employee_bulk_delete);

router.get('/:id', _employee2.default.employee_detail);
router.put('/:id', _employee2.default.employee_update);
router.delete('/:id', _employee2.default.employee_delete);

module.exports = router;
//# sourceMappingURL=employee.js.map