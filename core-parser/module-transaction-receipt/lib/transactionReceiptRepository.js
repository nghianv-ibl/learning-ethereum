const TransactionReceiptSchema = require('../model/transactionReceiptSchema');

class TransactionReceiptRepository {

	constructor(mongooseInstance) {
		this.mongooseInstance = mongooseInstance;
		this.TransactionReceipt = this.mongooseInstance.model('TransactionReceipt', TransactionReceiptSchema);
	}

}

module.exports = TransactionReceiptRepository;
