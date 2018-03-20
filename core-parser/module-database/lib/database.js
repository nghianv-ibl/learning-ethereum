const mongoose = require('mongoose'),
	logger = global.logger;

mongoose.Promise = global.Promise;

class Database {

	constructor(databaseConfig) {
		this.host = databaseConfig.DB_HOST;
		this.port = databaseConfig.DB_PORT;
		this.user = databaseConfig.DB_USER;
		this.pass = databaseConfig.DB_PASS;
		this.db = databaseConfig.DB_NAME;
		this.options = databaseConfig.DB_OPTIONS;
		this.url = this.url = `mongodb://${this.user}:${this.pass}@${this.host}/${this.db}`;
	}

	getMongooseInstance(callback) {
		/* Create connection */
		const conn = mongoose.createConnection(this.url, this.options);

		/* Listen Database Events */
		conn.on('error', error => {
			logger.info(`Connect fail to database => ${this.db}, url => ${this.url}`);
			logger.error(JSON.stringify(error));
			callback(null);
		});
		conn.on('connected', () => {
			logger.info(`Connected database => ${this.db}, url => ${this.url}`);
			callback(conn);
		});
	}

}


module.exports = Database;
