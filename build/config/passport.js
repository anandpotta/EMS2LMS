// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var passport = require('passport');


// Define the Passport configuration method
module.exports = function (app) {
	app.use(passport.initialize());

	// Use Passport's 'serializeUser' method to serialize the user id
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	// Use Passport's 'deserializeUser' method to load the user document
	passport.deserializeUser(function (id, done) {
		_user2.default.findOne({
			_id: id
		}, '-password -salt', function (err, user) {
			done(err, user);
		});
	});

	// Load Passport's strategies configuration files
	require('./strategies/local.js')();
	// require('./strategies/twitter.js')();
	// require('./strategies/facebook.js')();
	// require('./strategies/google.js')();
};
//# sourceMappingURL=passport.js.map