import React from 'react';
import 'normalize.css';

export const Context = React.createContext();

class C1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {s: 1}
    }

    handler = (e) => {
        this.setState(ps => ({s: ps.s + 1}))
    };

    render() {
        console.log('C1')
        return (
            <>
                <button onClick={this.handler}>C1 {this.state.s}</button>
                <Context.Provider value={this.state.s}>
                    {this.props.children}
                </Context.Provider>
            </>
        )
    }
}

class C2 extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    render() {
        console.log('C2')
        return (
            <div>C2
                <C3/>
            </div>
        )
    }

}

class C3 extends React.Component {
    render() {
        console.log('C3')
        return (
            <Context.Consumer>
                {value => <C4/>}
            </Context.Consumer>
        )
    }
}

class C4 extends React.Component {
    render() {
        console.log('C4')
        return <div>C4</div>
    }
}

class App extends React.Component {
    render() {
        return (
            <>
                <C1>
                    <C2/>
                </C1>
            </>
        )
    }
}

export default App;