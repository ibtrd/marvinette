class LoginQueue {
	constructor(limit) {
		this.limit = limit;
		this.queue = [];
		this.lastCallTime = 0;
		this.isProcessing = false;
		}

	add(loginAttempt, ...args) {
		this.queue.push({loginAttempt, args});
		this.processQueue();
	}

	processQueue() {
		if (this.isProcessing) return;

		const now = Date.now();
		const timeSinceLastCall = now - this.lastCallTime;

		if (this.queue.length && timeSinceLastCall >= this.limit) {
			this.isProcessing = true;
			this.lastCallTime = now;
			const { loginAttempt, args } = this.queue.shift();

			loginAttempt(...args).then(() => {
				this.isProcessing = false;
				this.processQueue();
			})
			.catch(() => {
				console.error(
				  `Login attempt failed at ${new Date().toISOString()}`
				);
				this.isProcessing = false;
				this.processQueue();
			});
		} else {
			const timeToWait = Math.max(this.limit - timeSinceLastCall, 0);
			setTimeout(() => this.processQueue(), timeToWait);
		}
	}
}

module.exports = LoginQueue;