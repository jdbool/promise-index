const promiseIndex = asyncFunction => {
	const pendingPromises = {};

	const run = async (uniqueKey, ...args) => {
		try {
			const result = await asyncFunction(...args);
			delete pendingPromises[uniqueKey];
			return result;
		} catch (err) {
			delete pendingPromises[uniqueKey];
			throw err;
		}
	};

	return async (uniqueKey, ...args) => {
		if (!pendingPromises[uniqueKey])
			pendingPromises[uniqueKey] = run(uniqueKey, ...args);

		return pendingPromises[uniqueKey];
	};
};

const promiseQueue = asyncFunction => {
	const pendingPromises = {};

	const run = async (uniqueKey, ...args) => {
		if (pendingPromises[uniqueKey]) {
			await pendingPromises[uniqueKey].then(
				() => 0,
				() => 1
			);
		}
		const result = await asyncFunction(...args);
		return result;
	};

	return async (uniqueKey, ...args) => {
		const promise = run(uniqueKey, ...args);
		pendingPromises[uniqueKey] = promise;
		return promise;
	};
};

module.exports = {
	promiseIndex,
	promiseQueue
};
