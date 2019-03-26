import React from 'react';
import ReactDOM from 'react-dom';
import {act} from 'react-dom/test-utils'
import App from './31App'

test('should tick to a new value', () => {
    jest.useFakeTimers();
    const el = document.createElement('div');
    // act(() => {
        ReactDOM.render(<App/>, el);
    // })
    expect(el.innerHTML).toBe("0");
    act(() => {
        jest.runAllTimers();
    })
    expect(el.innerHTML).toBe('1');
})

xtest('should increment counter', () => {
    const el = document.createElement('div');
    console.log(global === window)
    document.body.appendChild(el); // we attach the element to document.body to ensure events work
    ReactDOM.render(<App/>, el);
    const button = el.childNodes[0];
    act(() => {
        for (let i = 0; i < 3; i++) {
            button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        }
    });
    expect(button.innerHTML).toBe('3');
})