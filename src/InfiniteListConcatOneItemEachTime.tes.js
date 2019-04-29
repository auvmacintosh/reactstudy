import React from 'react';
import ReactDom from 'react-dom';
import {act} from 'react-dom/test-utils';
import './utility/tail';
import InfiniteListConcatOneItemEachTime from "./InfiniteListConcatOneItemEachTime";
import mockArticles from './utility/articles';

let container = document.createElement('div');
document.body.appendChild(container);
window.fetch = jest.fn(() => new Promise(resolve => (resolve({
    ok: true,
    status: 200,
    json: () => mockArticles
}))));
jest.spyOn(window.AbortController.prototype, 'abort');
const Wrapper = { // jest.spyOn只能作用在object上，所以给这个function套一个object。
    IL : InfiniteListConcatOneItemEachTime
};
jest.spyOn(Wrapper, 'IL');

window.innerHeight = 300;
window.scrollY = 100;
let idx = 0;
Object.defineProperty(document.body, 'clientHeight', {
    get: jest.fn(() => {
        let returnArray = [300, 400, 500];
        console.log(returnArray[idx % returnArray.length]);
        return returnArray[idx++ % returnArray.length];
    })
});

// expected output:
// start initial render
// 300
// 400
// 500
// finish initial render
// start resize event
// 300
// 400
// 500
// finish resize event
// start scroll event
// 300
// 400
// 500
// finish scroll event
describe('fetch when the page reach bottom', () => {
    test('initial render', (done) => {
        act(() => {
            console.log('start initial render');
            ReactDom.render(<Wrapper.IL/>, container);
        });
        setTimeout(() => {
            expect(fetch).toHaveBeenCalledTimes(2);
            // 下边的Wrapper.IL的测试是为了测试每次下载n条数据，都会拆成一条一条，分成n次渲染
            // 下边的数字应该是上边的2*20+1这个值，20是我mock的API返回条数。
            expect(Wrapper.IL).toHaveBeenCalledTimes(41);
            console.log('finish initial render');
            done();
        }, 0);
    });

    test('lunch resize event', (done) => {
        act(() => {
            console.log('start resize event');
            window.dispatchEvent(new Event('resize'));
            // the sequential event should not have listener.
            window.dispatchEvent(new Event('resize'));
            window.dispatchEvent(new Event('scroll'));
        });
        setTimeout(() => {
            expect(fetch).toHaveBeenCalledTimes(4);
            expect(Wrapper.IL).toHaveBeenCalledTimes(81);
            console.log('finish resize event');
            done();
        }, 0);
    });

    test('lunch scroll event', (done) => {
        act(() => {
            console.log('start scroll event');
            window.dispatchEvent(new Event('scroll'));
            // the sequential event should not have listener.
            window.dispatchEvent(new Event('resize'));
            window.dispatchEvent(new Event('scroll'));
        });
        setTimeout(() => {
            expect(fetch).toHaveBeenCalledTimes(6);
            expect(Wrapper.IL).toHaveBeenCalledTimes(121);
            console.log('finish scroll event');
            done();
        }, 0);
    });
});

test('cancel AJAX calls when unmount', (done) => {
    // eventListener有没有被remove就没法测，因为js就没提供getEventListener功能
    act(() => {
        ReactDom.unmountComponentAtNode(container);
    });
    setTimeout(() => {
        expect(AbortController.prototype.abort).toHaveBeenCalledTimes(1);
        done();
    }, 0);
});

