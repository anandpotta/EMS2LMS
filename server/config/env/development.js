// Invoke 'strict' JavaScript mode
'use strict';

// Set the 'development' environment configuration object
module.exports = {
	server: {
		port: 8080
	},
	db: {
		uri: 'mongodb://localhost:27018/EMS',
		// uri: 'mongodb://michael:michael@ds163053.mlab.com:63053/ems-mern',
		// uri: 'mongodb://admin:<PASSWORD>@ems-shard-00-00-n24oi.mongodb.net:27017,ems-shard-00-01-n24oi.mongodb.net:27017,ems-shard-00-02-n24oi.mongodb.net:27017/test?ssl=true&replicaSet=ems-shard-0&authSource=admin',
		options: {
			useMongoClient: true
		}
	}
};
