import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {act} from 'react-dom/test-utils';

const App = () => {
    const [x, setX] = useState('before');

    const handler = (e) => {
        e.preventDefault();
        setTimeout(()=>{setX('after')},0);
    };

    return (
        <>
            <button id='setState' onClick={handler}>click</button>
            <div id='state'>{x}</div>
        </>
    )
};

// class App extends React.Component {
//     state = {x: 'before'};
//
//     handler = (e) => {
//         e.preventDefault();
//         setTimeout(() => {
//             this.setState({x: 'after'})
//         }, 0);
//     }
//
//     render() {
//         return (
//             <>
//                 <button id='setState' onClick={this.handler}>click</button>
//                 <div id='state'>{this.state.x}</div>
//             </>
//         )
//     }
// }

test('fire a event that will set state',
    (done) => {
        let el = document.createElement('div');
        document.body.appendChild(el);
        act(() => {
            ReactDOM.render(<App/>, el);
        });
        act(() => { // {bubbles: true} 必须得有，没有test不通过，因为React需要把DOM event bubble up到Component
            // Event，你的handler是Component的Event
            document.getElementById('setState').dispatchEvent(new MouseEvent('click', {bubbles: true}));
        });
        setTimeout(() => {
            expect(document.getElementById('state').innerHTML).toBe('after');
            done();
        }, 0);
    }
);
// import axios from 'axios';
// import a from './articles.json';
// import {render, fireEvent, wait} from 'react-testing-library';
// import App from '../App';

// jest.mock('axios');

// xtest('displays titles when clicking Search',
//     (done) => { // 如果不传done进去，setTimeout的callback就不会被执行。jest默认不执行test里的callback。对于Promise，用return
//         axios.get.mockResolvedValue({data: a});
//         let el = document.createElement('div');
//         act(() => {
//             ReactDOM.render(<App/>, el);
//         });
//         document.body.appendChild(el); // 如果不append上去，document.getxxx就找不到这个element，也不能触发event
//         act(() => {
//             document.getElementById('searchbutton').dispatchEvent(new MouseEvent('click', {bubbles: true}));
//         });
//
//         setTimeout(() => {
//             expect(document.getElementById('search-result')).toHaveTextContent('Linux');
//             done();
//         }, 0);
//     }
// );
//
// xtest('displays titles when clicking Search',
//     () => {
//         let resolve;
//         // 这种思路是说，把异步的Fetch Override成一个同步的函数，但是这个做法限制了实现，如果实现里
//         // 调用了两词then，或者调用了catch，就回报runtime error，原因是没有第二个then和catch方法
//         axios.get.mockImplementation(() => {
//             return {
//                 then: (fn) => {
//                     resolve = fn;
//                 }
//             }
//         });
//         let el = document.createElement('div');
//         act(() => {
//             ReactDOM.render(<App/>, el);
//         });
//         document.body.appendChild(el); // 如果不append上去，document.getxxx就找不到这个element
//         document.getElementById('searchbutton').dispatchEvent(new MouseEvent('click', {bubbles: true}));
//         act(() => {
//             resolve({data: a});
//         });
//         expect(document.getElementById('search-result')).toHaveTextContent('Linux');
//     }
// );
//
// xtest('displays titles when clicking Search',
//     async () => {
//         axios.get.mockResolvedValue({data: a});
//         const {getByText, getByTestId} = render(<App/>);
//         fireEvent.click(getByText('Search'));
//         await wait(() => getByTestId('search-result'));
//         expect(axios.get).toHaveBeenCalledTimes(1);
//         expect(getByTestId('search-result')).toHaveTextContent('Linux');
//     }
// );

