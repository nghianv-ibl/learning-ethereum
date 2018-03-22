const events = require('events');

class Notify {

	constructor() {
		this.notifyEvents = new events.EventEmitter();
	}

	/* Emit Block */
	notifyBlock(block) {
		this.notifyEvents.emit('block', block);
	}

	notifyBlockInserted(block) {
		this.notifyEvents.emit('block.inserted', block);
	}

	notifyBlockRemoved(block) {
		this.notifyEvents.emit('block.removed', block);
	}

	/* Emit Transaction */
	notifyTransaction(transaction) {
		this.notifyEvents.emit('transaction', transaction);
	}

	notifyTransactionInserted(transaction) {
		this.notifyEvents.emit('transaction.inserted', transaction);
	}

	notifyTransactionRemoved(transaction) {
		this.notifyEvents.emit('transaction.removed', transaction);
	}

	/* Watch Block */
	watchBlock(callback) {
		this.notifyEvents.on('block', block => callback(block));
	}

	watchBlockInserted(callback) {
		this.notifyEvents.on('block.inserted', block => callback(block));
	}

	watchBlockRemoved(callback) {
		this.notifyEvents.on('block.removed', block => callback(block));
	}

	/* Watch Transaction */
	watchTransaction(callback) {
		this.notifyEvents.on('transaction', transaction => callback(transaction));
	}

	watchTransactionInserted(callback) {
		this.notifyEvents.on('transaction.inserted', transaction => callback(transaction));
	}

	watchTransactionRemoved(callback) {
		this.notifyEvents.on('transaction.removed', transaction => callback(transaction));
	}

}

module.exports = Notify;
