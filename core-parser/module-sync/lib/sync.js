const Logger = require('../../module-logger'),
	Notify = require('../../module-notify'),
	Web3 = require('web3'),
	Async = require('async');

class Sync {

	constructor(loggerConfig, databaseConfig, providerConfig) {
		this.loggerConfig = loggerConfig;
		this.databaseConfig = databaseConfig;
		this.providerConfig = providerConfig;
	}

	startSync() {
		/* Logger */
		global.logger = new Logger(this.loggerConfig);

		/* Notify */
		global.notify = new Notify();

		this.watchBlockInserted();
		this.watchBlockRemoved();
		this.watchTransactionInserted();
		this.watchTransactionRemoved();

		const Database = require('../../module-database'),
			Block = require('../../module-block'),
			Transaction = require('../../module-transaction'),
			TransactionReceipt = require('../../module-transaction-receipt');

		/* Database */
		const database = new Database(this.databaseConfig);

		/* Start */
		database.getMongooseInstance(mongooseInstance => {
			if (!mongooseInstance)
				throw new Error('Connect to mongodb fail');

			/* Initialize Model */
			const block = new Block(mongooseInstance);
			const transaction = new Transaction(mongooseInstance);
			const transactionReceipt = new TransactionReceipt(mongooseInstance);

			/* Watch */
			block.watch();
			transaction.watch();
			transactionReceipt.watch();

			/* Web3 */
			this.web3 = new Web3(new Web3.providers.HttpProvider(this.providerConfig.FULL_NODE));
			if (this.web3.isConnected()) {
				this.filter = this.web3.eth.filter(this.providerConfig.WEB3_FILTER);
				this.filter.watch((error, blockHash) => {
					if (error)
						return global.logger.error(JSON.stringify(error));
					this.web3.eth.getBlock(blockHash, (error, block) => {
						if (error)
							return global.logger.error(JSON.stringify(error));
						global.notify.notifyBlock(block);
					});
				});
			} else {
				global.logger.error('Fullnode is not alive, restart fullnode and then restart core parser');
				process.exit(0);
			}

			/* Check Fullnode Alive */
			setInterval(() => {
				if (!this.web3.isConnected()) {
					global.logger.error('Fullnode is not alive, restart fullnode and then restart core parser');
					process.exit(0);
				}
			}, this.providerConfig.FULL_NODE_CHECK);
		});
	}
	// console.log('Memory usage (MB) => ', Number(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2));

	/* Block Scope */
	watchBlockInserted() {
		global.notify.watchBlockInserted(block => {
			const transactions = [];
			Async.each(block.transactions, (transactionHash, callback) => {
				this.web3.eth.getTransaction(transactionHash, (error, transaction) => {
					if (error)
						return callback(error);
					transactions.push(transaction);
					callback(null);
				});
			}, error => {
				if (error)
					throw error;
				transactions.forEach(transaction => global.notify.notifyTransaction(transaction));
			});
		});
	}

	watchBlockRemoved() {

	}

	/* Transaction Scope */
	watchTransactionInserted() {

	}

	watchTransactionRemoved() {

	}
}

module.exports = Sync;
