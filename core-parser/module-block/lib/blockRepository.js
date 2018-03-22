const BlockSchema = require('../model/blockSchema');

class BlockRepository {

	constructor(mongooseInstance) {
		this.mongooseInstance = mongooseInstance;
		this.Block = this.mongooseInstance.model('Block', BlockSchema);
	}

	insertBlock(blockData) {
		return new Promise((resolve, reject) => {
			this.Block.create(blockData, (error, block) => {
				if (error)
					reject(error);
				resolve(block);
			});
		});
	}

	findByNumber(number) {
		return new Promise((resolve, reject) => {
			this.Block.findOne({ number: number }, (error, block) => {
				if (error)
					reject(error);
				resolve(block);
			});
		});
	}

	findByHash(hash) {
		return new Promise((resolve, reject) => {
			this.Block.findOne({ hash: hash }, (error, block) => {
				if (error)
					reject(error);
				resolve(block);
			});
		});
	}

	removeBlockByNumber(number) {
		return new Promise((resolve, reject) => {
			this.Block.remove({ number: number }, (error, block) => {
				if (error)
					reject(error);
				resolve(block);
			});
		});
	}

	removeBlockByHash(hash) {
		return new Promise((resolve, reject) => {
			this.Block.remove({ hash: hash }, (error, block) => {
				if (error)
					reject(error);
				resolve(block);
			});
		});
	}
}

module.exports = BlockRepository;
