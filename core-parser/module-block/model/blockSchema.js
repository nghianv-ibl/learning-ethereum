const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const blockSchema = new Schema({
	// Number - the block number. null when its pending block
	number : {
		type: Number,
		// required: true
	},

	// String - 32 Bytes - hash of the block. null when its pending block
	hash: {
		type: String,
		// required: true
	},

	// String - 32 Bytes - hash of the parent block
	parentHash: {
		type: String,
		required: true
	},

	// String - 8 Bytes - hash of the generated proof-of-work. null when its pending block
	nonce: {
		type: String,
		required: true
	},

	// String - 32 Bytes - SHA3 of the uncles data in the block
	sha3Uncles: {
		type: String,
		required: true
	},

	// String - 256 Bytes - the bloom filter for the logs of the block. null when its pending block
	logsBloom: {
		type: String,
		// required: true
	},

	// String - 32 Bytes - the root of the transaction trie of the block
	transactionsRoot: {
		type: String,
		required: true
	},

	// String - 32 Bytes - the root of the final state trie of the block
	stateRoot: {
		type: String,
		required: true
	},

	// String - 20 Bytes - the address of the beneficiary to whom the mining rewards were given
	miner: {
		type: String,
		required: true
	},

	// BigNumber - integer of the difficulty for this block
	difficulty: {
		type: Number,
		required: true
	},

	// BigNumber - integer of the total difficulty of the chain until this block
	totalDifficulty: {
		type: Number,
		required: true
	},

	// String - the "extra data" field of this block
	extraData: {
		type: String,
		required: true
	},

	// Number - integer the size of this block in bytes
	size: {
		type: Number,
		required: true
	},

	// Number - the maximum gas allowed in this block
	gasLimit: {
		type: Number,
		required: true
	},

	// Number - the total used gas by all transactions in this block
	gasUsed: {
		type: Number,
		required: true
	},

	// Number - the unix timestamp for when the block was collated
	timestamp: {
		type: Number,
		required: true
	},

	// Array - Array of transaction objects, or 32 Bytes transaction hashes
	transactions: {
		type: [String],
		required: true
	},

	// Array - Array of uncle hashes
	uncles: {
		type: [String],
		required: true
	}
}, {
	collection: 'blocks'
});

module.exports = blockSchema;

/*
{
  "number": 3,
  "hash": "0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46",
  "parentHash": "0x2302e1c0b972d00932deb5dab9eb2982f570597d9d42504c05d9c2147eaf9c88",
  "nonce": "0xfb6e1a62d119228b",
  "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
  "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "transactionsRoot": "0x3a1b03875115b79539e5bd33fb00d8f7b7cd61929d5a3c574f507b8acf415bee",
  "stateRoot": "0xf1133199d44695dfa8fd1bcfe424d82854b5cebef75bddd7e40ea94cda515bcb",
  "miner": "0x8888f1f195afa192cfee860698584c030f4c9db1",
  "difficulty": BigNumber,
  "totalDifficulty": BigNumber,
  "size": 616,
  "extraData": "0x",
  "gasLimit": 3141592,
  "gasUsed": 21662,
  "timestamp": 1429287689,
  "transactions": [
    "0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b"
  ],
  "uncles": []
}
*/
