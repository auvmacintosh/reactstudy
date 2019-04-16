import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './utility/tail';
import 'normalize.css'
import * as serviceWorker from './serviceWorker';
import DataWindow from "./DataWindow";
import InfiniteList from "./InfiniteList";

ReactDOM.render((
    <DataWindow>
        <InfiniteList/>
    </DataWindow>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
