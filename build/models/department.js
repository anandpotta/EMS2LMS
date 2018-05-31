"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var deparmentSchema = new Schema({
  id: Number,
  name: { type: String, required: true },
  manager: Schema.Types.ObjectId,
  location: String
}, { timestamps: true });

const Deparment = _mongoose2.default.model("deparments", deparmentSchema);
module.exports = Deparment;
//# sourceMappingURL=department.js.map