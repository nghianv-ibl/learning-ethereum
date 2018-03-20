const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const transactionSchema = new Schema({
	// String, 32 Bytes - hash of the transaction
	hash: {
		type: String,
		required: true
	},

	// Number - the number of transactions made by the sender prior to this one
	nonce: {
		type: Number,
		required: true
	},

	// String, 32 Bytes - hash of the block where this transaction was in. null when its pending
	blockHash: {
		type: String,
		// required: true
	},

	// Number - block number where this transaction was in. null when its pending
	blockNumber: {
		type: Number,
		// required: true
	},

	// Number - integer of the transactions index position in the block. null when its pending
	transactionIndex: {
		type: Number,
		// required: true
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

	// BigNumber - value transferred in Wei
	value: {
		type: String,
		required: true
	},

	// BigNumber - gas price provided by the sender in Wei
	gasPrice: {
		type: String,
		required: true
	},

	// Number - gas provided by the sender
	gas: {
		type: Number,
		required: true
	},

	// String - the data sent along with the transaction
	input: {
		type: String,
		required: true
	}
}, {
	collection: 'transactions'
});

module.exports = transactionSchema;

/*
{
  "hash": "0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b",
  "nonce": 2,
  "blockHash": "0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46",
  "blockNumber": 3,
  "transactionIndex": 0,
  "from": "0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b",
  "to": "0x6295ee1b4f6dd65047762f924ecd367c17eabf8f",
  "value": BigNumber,
  "gas": 314159,
  "gasPrice": BigNumber,
  "input": "0x57cb2fc4"
}
*/
