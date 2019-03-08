import React from 'react';
import 'normalize.css';

let log = console.log.bind(console);

class Item extends React.Component {

    constructor(props) {
        super(props);
        this.state={};
    }

    get name() {
        return this.constructor.name + this.props.name;
    }

    componentWillReceiveProps() {
        log(this.name + ' will receive props')
    }

    componentWillUpdate() {
        log(this.name + ' will update')
    }

    componentWillUnmount() {
        log(this.name + ' will unmount');
    }

    componentWillMount() {
        log(this.name + ' will mount');
    }

    componentDidMount() {
        log(this.name + ' did mount')
    }

    shouldComponentUpdate(np, ns) {
        return !shallowCompare(np, this.props) || !shallowCompare(ns, this.state);
        // return true;
        // return false;
    }

    render() {
        log(this.name + ' render')
        return <div>{this.props.name}</div>
    }
}

const shallowCompare = (obj1, obj2) =>
    Object.keys(obj1).length === Object.keys(obj2).length &&
    Object.keys(obj1).every(key =>
        obj2.hasOwnProperty(key) && obj1[key] === obj2[key]
    );

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {xs: [1, 2, 3, 4, 5]}
    }

    handler = () => {
        this.setState({xs: [5, 1, 2, 3, 4]})
    }

    render() {
        return (
            <>
                {this.state.xs.map(x => <Item key={x} name={x}/>)}
                <button onClick={this.handler}>Click</button>
            </>
        )
    }
}

export default App;