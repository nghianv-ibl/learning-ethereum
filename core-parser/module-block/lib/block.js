const BlockRepository = require('./blockRepository');

class Block {

	constructor(mongooseInstance) {
		this.blockRepository = new BlockRepository(mongooseInstance);
	}

	watch() {
		global.notify.watchBlock(block => {
			this.processBlock(block);
		});
	}

	processBlock(block) {
		const blockData = {
			number: block.number,
			hash: block.hash,
			parentHash: block.parentHash,
			nonce: block.nonce,
			sha3Uncles: block.sha3Uncles,
			logsBloom: block.logsBloom,
			transactionsRoot: block.transactionsRoot,
			stateRoot: block.stateRoot,
			miner: block.miner,
			difficulty: block.difficulty.toNumber(),
			totalDifficulty: block.totalDifficulty.toNumber(),
			size: block.size,
			extraData: block.extraData,
			gasLimit: block.gasLimit,
			gasUsed: block.gasUsed,
			timestamp: block.timestamp,
			transactions: block.transactions,
			uncles: block.uncles
		};

		this.checkBlock(block, exist => {
			if (!exist)
				return this.insertBlock(blockData, inserted => {
					if (!inserted)
						process.exit(0);
				});
			this.removeBlock(block, removed => {
				if (!removed)
					process.exit(0);
				this.insertBlock(blockData, inserted => {
					if (!inserted)
						process.exit(0);
				});
			});
		});
	}

	checkBlock(block, callback) {
		this.blockRepository.findByNumber(block.number)
			.then(found => {
				if (found) {
					global.logger.warn(`Found block number ${block.number} in database, try to remove block number ${block.number} in database`);
					callback(true);
				} else {
					global.logger.info(`Not found block number ${block.number} in database, try to insert block number ${block.number} to database`);
					callback(false);
				}
			})
			.catch(error => {
				throw error;
			});
	}

	removeBlock(block, callback) {
		this.blockRepository.removeBlockByNumber(block.number)
			.then(deleted => {
				if (deleted) {
					global.logger.info(`Removed block number ${block.number} in database, try to insert block number ${block.number} to database`);
					global.notify.notifyBlockRemoved(block.number);
					callback(true);
				} else {
					global.logger.error(`Cannot remove block number ${block.number} in database, try to stop core parser`);
					callback(false);
				}
			})
			.catch(error => {
				throw error;
			});
	}

	insertBlock(blockData, callback) {

		this.blockRepository.insertBlock(blockData)
			.then(inserted => {
				if (inserted) {
					global.logger.info(`Inserted block number ${blockData.number} to database`);
					global.notify.notifyBlockInserted(blockData);
					callback(true);
				} else {
					global.logger.error(`Cannot insert block number ${blockData.number} to database`);
					callback(false);
				}
			})
			.catch(error => {
				throw error;
			});
	}

}

module.exports = Block;
