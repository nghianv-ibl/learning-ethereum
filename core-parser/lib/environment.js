const dotENV = require('dotenv');

class Environment {
	constructor() { }

	configDotENV(options) {
		dotENV.config(options);
	}
}

module.exports = new Environment();
