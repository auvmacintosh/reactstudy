import React from 'react';
import ReactDom from 'react-dom';
import {act} from 'react-dom/test-utils';
import './utility/tail';
import DataArticle from "./DataArticle";
import mockArticles from './utility/articles'

xtest('initial render', () => {
    let container = document.createElement('div');
    document.body.appendChild(container);
    window.fetch = jest.fn(() => new Promise(resolve => (resolve({
        ok: true,
        status: 200,
        json: () => mockArticles
    }))));
    window.innerHeight = 300;
    window.scrollY = 100;
    Object.defineProperty(document.body, 'clientHeight', {
        get: jest.fn()
            .mockImplementationOnce(() => 300) // 第1次调用clientHeight返回300
            .mockImplementationOnce(() => 400) // 第2次调用clientHeight返回400
            .mockImplementationOnce(() => 500) // 第3次调用clientHeight返回500, stop fetch
            .mockImplementationOnce(() => 300) // 第4次调用clientHeight返回300
            .mockImplementationOnce(() => 400) // 第5次调用clientHeight返回400
            .mockImplementationOnce(() => 500) // 第6次调用clientHeight返回500, stop fetch
            .mockImplementationOnce(() => 300) // 第4次调用clientHeight返回300
            .mockImplementationOnce(() => 400) // 第5次调用clientHeight返回400
            .mockImplementationOnce(() => 500) // 第6次调用clientHeight返回500, stop fetch
    });
    act(() => {
        ReactDom.render(<DataArticle/>, container);
    });
    act(() => {
        window.dispatchEvent(new Event('resize'));
    });
    act(() => {
        window.dispatchEvent(new Event('scroll'));
    });

    expect(fetch).toHaveBeenCalledTimes(6);
});
