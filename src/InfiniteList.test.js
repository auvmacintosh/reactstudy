import React from 'react';
import ReactDom from 'react-dom';
import {act} from 'react-dom/test-utils';
import './utility/tail';
import InfiniteList from "./InfiniteList";
import mockArticles from './utility/articles'

let container = document.createElement('div');
document.body.appendChild(container);
window.fetch = jest.fn(() => new Promise(resolve => (resolve({
    ok: true,
    status: 200,
    json: () => mockArticles
}))));
window.innerHeight = 300;
window.scrollY = 100;
let idx = 0;
Object.defineProperty(document.body, 'clientHeight', {
    get: jest.fn().mockImplementation(() => {
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
            ReactDom.render(<InfiniteList/>, container);
        });
        setTimeout(() => {
            expect(fetch).toHaveBeenCalledTimes(2);
            console.log('finish initial render');
            done();
        }, 0)
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
            console.log('finish resize event');
            done();
        }, 0)
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
            console.log('finish scroll event');
            done();
        }, 0)
    });
});

