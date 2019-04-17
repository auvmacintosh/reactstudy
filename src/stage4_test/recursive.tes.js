//纯粹的recursive，测试结果完全符合预期

window.fetch = jest.fn(() => new Promise(resolve =>
    resolve()
));
let idx = 0;
// Object.defineProperty(document.body, 'clientHeight', {
//     get: jest.fn().mockImplementationOnce(() => {
//         let returnArray = [300, 400, 500]
//         return returnArray[idx++ % returnArray.length];
//     })
// });
let obj = {};
Object.defineProperty(obj, 'clientHeight', {
    get: jest.fn().mockImplementation(() => {
        let returnArray = [300, 400, 500]
        return returnArray[idx++ % returnArray.length];
    })
});
const ifLongEnough = () => {
    let tmp = obj.clientHeight;
    console.log(tmp);
    if (tmp <= 400) {
        fetch().then(() => {});
        ifLongEnough();
    }
};

test('execute certain times', () => {
    ifLongEnough();
    expect(fetch).toHaveBeenCalledTimes(2);
});