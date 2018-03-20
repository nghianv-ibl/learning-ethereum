const TransactionRepository = require('./transactionRepository'),
	notify = global.notify;

class Transaction {

	constructor(mongooseInstance) {
		this.blockRepository = new TransactionRepository(mongooseInstance);
	}

	watch() {

	}
}

module.exports = Transaction;
