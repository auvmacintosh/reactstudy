import React from 'react';
import {Context} from './App';

let log = console.log.bind(console);

class C extends React.Component {
    constructor(props) {
        super(props);
        this.state = {CStateValue: 1};
    }

    get name() {
        return this.constructor.name + this._reactInternalFiber.key;
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

    handler = (e) => {
        this.setState(ps => ({CStateValue: ps.CStateValue + 1}))
    };

    shouldComponentUpdate(nextProps, nextState) {
        // Update this component ONLY when the prop someProp changes
        // if (this.props.someProp !== nextProps.someProp) {
        //     return true;
        // }
        return true;
        // return false;
    }

    render() {
        return (
            <>
                <button onClick={this.handler}>
                    {this.name} {this.state.CStateValue}
                </button>
                <Context.Provider value={this.state.CStateValue}>
                {this.props.children}
                </Context.Provider>
                {/*<button onClick={this.handler}>App state updater</button>*/}
            </>
        )
    }
}

export default C;