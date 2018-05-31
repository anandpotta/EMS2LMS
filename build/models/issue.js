"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var issueSchema = _mongoose2.default.Schema({
  title: { type: String, required: true },
  owner: { type: String, required: true },
  status: { type: String, required: true },
  effort: { type: String, required: true },
  completionDate: { type: String, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const issue = _mongoose2.default.model("issue", issueSchema);
module.exports = issue;
//# sourceMappingURL=issue.js.map