const BlockSchema = require('../model/blockSchema');

class BlockRepository {

	constructor(mongooseInstance) {
		this.mongooseInstance = mongooseInstance;
		this.Block = this.mongooseInstance.model('Block', BlockSchema);
	}

	save(block) {
		this.Block.save(block);
	}

	findByNumber(blockNumber) {
		return this.Block.find({ number: blockNumber });
	}

	findByHash(blockHash) {
		return this.Block.find({ hash: blockHash });
	}
}

module.exports = BlockRepository;
