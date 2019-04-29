import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'normalize.css'
import * as serviceWorker from './serviceWorker';
import WindowState from "./WindowState";

ReactDOM.render((
    <WindowState/>
), document.getElementById('root'));

// import Test from "./stage4_test/TestRenderOneByOne";
// ReactDOM.render((
//     <Test/>
// ), document.getElementById('root'));

// import T from "./stage4_test/T"
// ReactDOM.render((
//     <T/>
// ), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
