const promiseIndex = require('./index');

const getRandom = promiseIndex(
	(add, prefix) =>
		new Promise(resolve => {
			setTimeout(() => {
				const random = Math.random() + add;
				resolve(prefix + random);
			}, 1000);
		})
);

(async () => {
	for (let i = 0; i < 10; ++i) {
		console.log('Running some promises...');

		const promises = new Array(20).fill('veryUniqueKey');
		await Promise.all(
			promises.map(key =>
				(async () => {
					console.log(await getRandom(key, 100, 'The number is: '));
				})()
			)
		);
	}
})();
