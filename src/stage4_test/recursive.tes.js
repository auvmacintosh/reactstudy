//纯粹的recursive，测试结果完全符合预期

let count = 1;
let doSomething = jest.fn(() => {
    console.log('Number ' + count++);
});
let obj = {};
Object.defineProperty(obj, 'ifOneMoreTime', {
    get: jest.fn()
        .mockImplementationOnce(() => true)
        .mockImplementationOnce(() => true)
        .mockImplementationOnce(() => false)
});

const recursiveFn = () => {
    if (obj.ifOneMoreTime) {
        doSomething();
        recursiveFn();
    }
};

test('execute certain times', () => {
    recursiveFn();
    expect(doSomething).toHaveBeenCalledTimes(2);
});