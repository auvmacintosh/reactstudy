let count = 1;
let obj = {};
Object.defineProperty(obj, 'ifOneMoreTime', {
    get: jest.fn()
        .mockImplementationOnce(() => true)
        .mockImplementationOnce(() => true)
        .mockImplementationOnce(() => false)
});
let doSomething = jest.fn(() => new Promise(resolve =>
    resolve('Number ' + count++)
));

const recursiveAsyncFn = () => {
    if (obj.ifOneMoreTime) {
        doSomething().then(resolve => {
            console.log(resolve);
            recursiveAsyncFn();
        });
    }
};

test('execute certain times', async () => {
    await recursiveAsyncFn();
    expect(doSomething).toHaveBeenCalledTimes(2);
});