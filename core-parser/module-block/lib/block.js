const BlockRepository = require('../lib/blockRepository'),
	notify = global.notify;

class Block {
	
	constructor(mongooseInstance) {
		this.blockRepository = new BlockRepository(mongooseInstance);
	}

	watch() {

	}
}

module.exports = Block;
