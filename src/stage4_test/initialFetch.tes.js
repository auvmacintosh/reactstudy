import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {act} from 'react-dom/test-utils';

window.fetch = jest.fn(() => new Promise(resolve =>
    resolve()
));

const App = () => {
    let [state, setState] = useState('');
    useEffect(() => {
        fetch('').then(() => {
            setState('fetched')
        });
    }, []);
    return <div id='id'>{state}</div>
};

test('test App', (done) => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    act(() => {
        ReactDOM.render(<App/>, container);
    });

    setTimeout(() => {
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(document.getElementById('id').innerHTML).toBe('fetched');
        done();
    }, 100);
});