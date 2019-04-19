import React, {useEffect} from 'react';
import ReactDom from 'react-dom';
import {act} from 'react-dom/test-utils';

const App = () => {
    useEffect(() => {
        console.log('effect');
        return () => {
            console.log('return effect')
        }
    }, [])
    return <div>hello</div>
};
let container = document.createElement('div');
document.body.appendChild(container);
const spy = jest.spyOn(console, 'log');

test('test effect', (done) => {
    act(() => {
        ReactDom.render(<App/>, container);
    });
    setTimeout(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        done();
    }, 0);
});

test('test return effect', (done) => {
    act(() => {
        ReactDom.unmountComponentAtNode(container);
    });
    setTimeout(() => {
        expect(spy).toHaveBeenCalledTimes(2);
        done();
    }, 0);
});