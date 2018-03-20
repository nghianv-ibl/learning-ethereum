const TransactionReceiptRepository = require('./transactionReceiptRepository');

class TransactionReceipt {

	constructor(mongooseInstance) {
		this.transactionReceiptRepository = new TransactionReceiptRepository(mongooseInstance);
	}

	watch() {

	}
}

module.exports = TransactionReceipt;
