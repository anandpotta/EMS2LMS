"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bcrypt = require('bcrypt');
const saltRounds = 10;

var Schema = _mongoose2.default.Schema;
var userSchema = new Schema({
  email: {
    type: String,
    index: { unique: true }
  },
  password: {
    type: String,
    required: true
  },
  nikename: String,
  bio: String
}, {
  timestamps: true
});

userSchema.pre("save", function (next) {
  var user = this;

  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, function (err, hashedPassword) {
      if (err) {
        return next(err);
      }
      user.password = hashedPassword;
      this.updatedAt = Date.now();
      next();
    });
  });
});

userSchema.methods.authenticate = function (password, cb) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.name = function () {
  return this.displayName || this.username;
};

const User = _mongoose2.default.model("user", userSchema);
module.exports = User;
//# sourceMappingURL=user.js.map