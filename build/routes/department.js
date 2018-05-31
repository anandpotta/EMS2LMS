'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _department = require('../controllers/department');

var _department2 = _interopRequireDefault(_department);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

router.get('/', _department2.default.department_list);
router.post('/', _department2.default.department_create);

router.put('/:id', _department2.default.department_update);

module.exports = router;
//# sourceMappingURL=department.js.map