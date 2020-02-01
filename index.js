const promiseIndex = asyncFunction => {
	const pendingPromises = {};

	const run = async (uniqueKey, ...args) => {
		const result = await asyncFunction(...args);
		delete pendingPromises[uniqueKey];
		return result;
	};

	return async (uniqueKey, ...args) => {
		if (!pendingPromises[uniqueKey])
			pendingPromises[uniqueKey] = run(uniqueKey, ...args);

		return pendingPromises[uniqueKey];
	};
};

module.exports = promiseIndex;
