import React from 'react';
import 'normalize.css';
import {compose} from 'ramda';
import {combineReducers, createStore} from 'redux';

let log = console.log.bind(console);

let counter1 = (state = 0, action) => {
    switch (action.type) {
        case 'INC1':
            return state + action.payload;
        case 'DEC1':
            return state - action.payload;
        default:
            return state;
    }
};
// 这里有意思的是，INC1也可以触发counter2，比如NAME_CHANGE事件可以触发twit的修改。
// 所以一个事件可以触发多个reducer
let counter2 = (state = 0, action) => {
    switch (action.type) {
        case 'INC2':
            return state + action.payload;
        case 'DEC2':
            return state - action.payload;
        default:
            return state;
    }
};
const counter = combineReducers({
    c1: counter1,
    c2: counter2,
})
let store = createStore(counter);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            c1: store.getState().c1,
            c2: store.getState().c2,
            step: 1,
        };
        store.subscribe(() => this.setState({
            c1: store.getState().c1,
            c2: store.getState().c2,
        }))

        this.deepClone = compose(JSON.parse, JSON.stringify);
        log(this.deepClone({a:1, b:2}));

    }

    componentWillUnmount() {
        store.unsubscribe();
    }

    handler = (e) => {
        switch (e.target.name) {
            case 'incButton1':
                store.dispatch({type: 'INC1', payload: this.state.step});
                break;
            case 'decButton1':
                store.dispatch({type: 'DEC1', payload: this.state.step});
                break;
            case 'incButton2':
                store.dispatch({type: 'INC2', payload: this.state.step});
                break;
            case 'decButton2':
                store.dispatch({type: 'DEC2', payload: this.state.step});
                break;
            case 'inp':
                this.setState({step: parseInt(e.target.value)});
                break;
            default:
                log('no such handler ' + e.target.name);
        }
    };

    render() {
        return (
            <>
                <div>{this.state.c1}</div>
                <div>{this.state.c2}</div>
                <input name='inp' value={this.state.step} onChange={this.handler}/>
                <button name='incButton1' onClick={this.handler}>INC1</button>
                <button name='decButton1' onClick={this.handler}>DEC1</button>
                <button name='incButton2' onClick={this.handler}>INC2</button>
                <button name='decButton2' onClick={this.handler}>DEC2</button>
            </>
        )
    }
}

export default App;