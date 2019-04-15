//recursive async，测试结果也完全符合预期

let count = 1;
let doSomething = jest.fn(() => new Promise(resolve =>
    resolve('Number ' + count++)
));

let obj = {};
Object.defineProperty(obj, 'ifOneMoreTime', {
    get: jest.fn()
        .mockImplementationOnce(() => true)
        .mockImplementationOnce(() => true)
        .mockImplementationOnce(() => false)
});

const recursiveAsyncFn = () => {
    if (obj.ifOneMoreTime) {
        doSomething().then(resolve => {console.log(resolve)});
        recursiveAsyncFn();
    }
};

test('execute certain times', () => {
    recursiveAsyncFn();
    expect(doSomething).toHaveBeenCalledTimes(2);
});