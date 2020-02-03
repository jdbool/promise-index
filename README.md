# promise-index

Small library for avoiding Promise race conditions in concurrent events.

# Using

```
npm i promise-index
```

Wrap around any async function, and what you get is a very similar function with an additional `uniqueKey` argument at the start.

If called when there's **already a pending promise** with the exact same `uniqueKey`, the same promise will be returned.

## Example

```js
const { promiseIndex } = require('promise-index');

// findOrCreateUser is the async function we can use
// Its first argument is the uniqueKey
const findOrCreateUser = promiseIndex(async userId => {
	const existing = await User.findById(userId);
	if (existing) return existing;

	const user = await User.create({
		_id: userId,
		thing: Math.random()
	});
	return user;
});

const simulateRequest = async => {
	const userId = '123abc';

	// Here userId is both the key for finding an existing promise, and the first argument of the function
	const user = await findOrCreateUser(userId, userId);
	console.log(user._id);
};

// 100 requests at the same time
// Only one user will be created for all of them
for (let i = 0; i < 100; i++) {
	simulateRequest();
}
```
