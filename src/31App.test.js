import React from 'react';
import ReactDOM from 'react-dom';
import {act} from 'react-dom/test-utils'
import App from './31App'
// https://github.com/threepointone/react-act-examples/blob/master/sync.md
test('should be 1', ()=>{
    const el = document.createElement('div');
    act(()=>{ReactDOM.render(<App />, el)});
    expect(el.innerHTML).toBe('1');
})