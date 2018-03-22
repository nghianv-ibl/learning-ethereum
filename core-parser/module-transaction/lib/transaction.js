const TransactionRepository = require('./transactionRepository');

class Transaction {

	constructor(mongooseInstance) {
		this.blockRepository = new TransactionRepository(mongooseInstance);
	}

	watch() {
		global.notify.watchTransaction(transaction => {
			this.processTransaction(transaction);
		});
	}

	processTransaction(transaction) {
		console.log(transaction);
	}
}

module.exports = Transaction;
