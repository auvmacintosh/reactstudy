import React from 'react';
import {Context} from './App';

let C1 = (props) => (
    <Context.Consumer>
        {value => <div>fuck{value}</div>}
    </Context.Consumer>
)

export default C1;