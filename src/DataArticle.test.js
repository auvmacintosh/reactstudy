import React from 'react';
import ReactDom from 'react-dom';
import {act} from 'react-dom/test-utils';
import DataArticle from "./DataArticle";

const DataArticleMockComponent = () => {

};

test('initial render', () => {
    let container = document.createElement('div');
    document.body.appendChild(container);
    act(() => {
        ReactDom.render(<DataArticle/>, container);
    })

});
