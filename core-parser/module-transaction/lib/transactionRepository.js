const TransactionSchema = require('../model/transactionSchema');

class TransactionRepository {

	constructor(mongooseInstance) {
		this.mongooseInstance = mongooseInstance;
		this.Transaction = this.mongooseInstance.model('Transaction', TransactionSchema);
	}

}

module.exports = TransactionRepository;
