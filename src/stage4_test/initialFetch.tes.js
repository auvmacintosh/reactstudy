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
            fetch('').then(() => {
                setState('fetched')
            });
        });
    }, []);
    return <div id='id'>{state}</div>
};

xtest('this test will not pass, since callbacks are not executed', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    act(() => {
        ReactDOM.render(<App/>, container);
    });

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(document.getElementById('id').innerHTML).toBe('fetched');
});

test('this test will be pass, since the callbacks have been executed', (done) => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    act(() => {
        ReactDOM.render(<App/>, container);
    });

    setTimeout(() => {
        expect(fetch).toHaveBeenCalledTimes(2);
        expect(document.getElementById('id').innerHTML).toBe('fetched');
        done();
    }, 100);
});

