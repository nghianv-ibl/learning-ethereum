class Config {

	constructor() { }

	getDatabaseConfig(name) {
		const databases = {
			CORE_PARSER: {
				DB_HOST: process.env.CORE_PARSER_DB_HOST || '127.0.0.1',
				DB_PORT: process.env.CORE_PARSER_DB_PORT || 27017,
				DB_USER: process.env.CORE_PARSER_DB_USER || 'core_parser',
				DB_PASS: process.env.CORE_PARSER_DB_PASS || 'core_parser',
				DB_NAME: process.env.CORE_PARSER_DB_NAME || 'core_parser',
				DB_OPTIONS: {
					autoIndex: false, // Don't build indexes
					reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
					reconnectInterval: 500, // Reconnect every 500ms
					poolSize: 10, // Maintain up to 10 socket connections
					// If not connected, return errors immediately rather than waiting for reconnect
					bufferMaxEntries: 0
				}
			}
		};
		return databases[name];
	}

	getProviderConfig() {
		return {
			FULL_NODE: process.env.FULL_NODE || 'http://localhost:8545',
			WEB3_FILTER: process.env.WEB3_FILTER || 'latest',
			REFRESH_FILTER: process.env.REFRESH_FILTER || 5000
		};
	}

	getLoggerConfig() {
		return {
			enable: process.env.LOGGER_ENABLE || 'true',
			infoPath: process.env.LOGGER_INFO_PATH || './logs/info',
			warnPath: process.env.LOGGER_WARN_PATH || './logs/warn',
			errorPath: process.env.LOGGER_ERROR_PATH || './logs/error'
		};
	}
}

module.exports = new Config();
