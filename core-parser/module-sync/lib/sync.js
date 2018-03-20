const Logger = require('../../module-logger'),
	Notify = require('../../module-notify'),
	Web3 = require('web3');

class Sync {
	constructor(loggerConfig, databaseConfig, providerConfig) {
		this.loggerConfig = loggerConfig;
		this.databaseConfig = databaseConfig;
		this.providerConfig = providerConfig;
	}

	startSync() {
		/* Logger */
		global.logger = new Logger(this.loggerConfig);
		this.logger = global.logger;

		/* Notify */
		global.notify = new Notify();
		this.notify = global.notify;

		const Database = require('../../module-database'),
			Block = require('../../module-block'),
			Transaction = require('../../module-transaction'),
			TransactionReceipt = require('../../module-transaction-receipt');

		/* Database */
		const database = new Database(this.databaseConfig);

		/* Sync */
		database.getMongooseInstance(mongooseInstance => {
			if (!mongooseInstance)
				throw new Error('Connect to mongodb fail');

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
				this.filter.watch((error, result) => {
					console.log(result);
				});
			} else {
				this.logger.error('Fullnode is not alive, restart fullnode and then restart core parser');
			}

			/* Check Fullnode Alive */
			// setInterval(this.checkFullNode.bind(this), this.providerConfig.REFRESH_FILTER);

		});
	}
	// console.log('Memory usage (MB) => ', Number(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2));
}

module.exports = Sync;
