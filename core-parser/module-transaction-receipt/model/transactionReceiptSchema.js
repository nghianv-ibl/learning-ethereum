const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const transactionReceiptSchema = new Schema({
	// String, 32 Bytes - hash of the block where this transaction was in
	blockHash: {
		type: String,
		required: true
	},

	// Number - block number where this transaction was in
	blockNumber: {
		type: Number,
		required: true
	},

	// String, 32 Bytes - hash of the transaction
	transactionHash: {
		type: String,
		required: true
	},

	// Number - integer of the transactions index position in the block
	transactionIndex: {
		type: Number,
		required: true
	},

	// String, 20 Bytes - address of the sender
	from: {
		type: String,
		required: true
	},

	// String, 20 Bytes - address of the receiver. null when its a contract creation transaction
	to: {
		type: String,
		// required: true
	},

	// Number - The total amount of gas used when this transaction was executed in the block
	cumulativeGasUsed: {
		type: Number,
		required: true
	},

	// Number - The amount of gas used by this specific transaction alone
	gasUsed: {
		type: Number,
		required: true
	},

	// String - 20 Bytes - The contract address created, if the transaction was a contract creation, otherwise null
	contractAddress: {
		type: String,
		required: true
	},

	// Array - Array of log objects, which this transaction generated
	logs: {
		type: [Schema.Types.Mixed],
		required: true
	},

	// Number - 0 indicates transaction failure , 1 indicates transaction succeeded
	status: {
		type: Number,
		required: true
	}
}, {
	collection: 'transactionReceipts'
});

module.exports = transactionReceiptSchema;

/*
{
  "transactionHash": "0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b",
  "transactionIndex": 0,
  "blockHash": "0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46",
  "blockNumber": 3,
  "contractAddress": "0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b",
  "cumulativeGasUsed": 314159,
  "gasUsed": 30234,
  "logs": [{
         // logs as returned by getFilterLogs, etc.
     }, ...],
  "status": "0x1"
}
*/
