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

module.exports = promiseIndex;
