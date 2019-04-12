import React from 'react';
import ReactDom from 'react-dom';
import {act} from 'react-dom/test-utils';
import DataArticle from "./DataArticle";

test('initial render',()=>{
    let container = document.createElement('div');
    ReactDom.render(<DataArticle/>, container);
});
