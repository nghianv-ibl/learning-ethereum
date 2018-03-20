const events = require('events');

class Notify {

	constructor() {
		this.notifyEvents = new events.EventEmitter();
	}

	notifyBlock(block) {
		this.notifyEvents.emit('block', block);
	}

	notyfyBlockRemove(block) {
		this.notifyEvents.emit('block.remove', block);
	}

	notifyTransaction(transaction) {
		this.notifyEvents.emit('transaction', transaction);
	}

	notifyTransactionRemove(transaction) {
		this.notifyEvents.emit('transaction.remove', transaction);
	}

	watchBlock(callback) {
		this.notifyEvents.on('block', block => {
			callback(block);
		});
	}

	watchBlockRemove(callback) {
		this.notifyEvents.on('block.remove', block => {
			callback(block);
		});
	}

	watchTransaction(callback) {
		this.notifyEvents.on('transaction', block => {
			callback(block);
		});
	}

	watchTransactionRemove(callback) {
		this.notifyEvents.on('transaction.remove', block => {
			callback(block);
		});
	}

}

module.exports = Notify;
