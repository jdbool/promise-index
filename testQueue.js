const { promiseQueue } = require('./index');

const getTime = promiseQueue(
	i =>
		new Promise(resolve => {
			setTimeout(() => {
				resolve(`${i}: ${Date.now() / 1000}`);
			}, 1000);
		})
);

(async () => {
	for (let i = 0; i < 10; ++i) {
		getTime('veryUniqueKey', i).then(console.log);
	}
	for (let i = 0; i < 10; ++i) {
		const res = await getTime('veryUniqueKey', i);
		console.log(res);
	}
})();
