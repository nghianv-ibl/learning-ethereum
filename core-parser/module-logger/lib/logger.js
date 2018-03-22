const winston = require('winston');

class Logger {

	constructor(loggerConfig) {

		this.loggerConfig = loggerConfig;

		const transports = [new (winston.transports.Console)({
			colorize: true
		})];

		if (this.loggerConfig.enable) {
			/* Info Log */
			transports.push(
				new (winston.transports.File)({
					name: 'info-file',
					filename: this.loggerConfig.infoPath + '/' + 'filelog-info.log',
					level: 'info'
				})
			);
			/* Error Log */
			transports.push(
				new (winston.transports.File)({
					name: 'error-file',
					filename: this.loggerConfig.errorPath + '/' + 'filelog-error.log',
					level: 'error'
				})
			);
			/* Warn Log */
			transports.push(
				new (winston.transports.File)({
					name: 'warn-file',
					filename: this.loggerConfig.warnPath + '/' + 'filelog-warn.log',
					level: 'warn'
				})
			);
		}

		this.logger = new (winston.Logger)({
			transports: transports
		});

	}

	info(message) {
		this.logger.info(message);
	}

	warn(message) {
		this.logger.warn(message);
	}

	error(message) {
		this.logger.error(message);
	}
}

module.exports = Logger;
