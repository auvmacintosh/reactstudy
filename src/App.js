import React from 'react';
import 'normalize.css';
import ReactDOM from "react-dom";

let log = console.log.bind(console);

class Item extends React.Component {

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

    render() {
        return <div>{this.props.name}</div>
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.el1 = document.getElementById('d1');
        this.el2 = document.getElementById('d2');
        this.state = {
            xs: [
                {name: '1', container: this.el1},
                {name: '2', container: this.el2},
            ]
        }
    }

    handler = () => {
        this.setState(
            {
                xs: [
                    {name: '1', container: this.el2},
                    {name: '2', container: this.el1},
                ]
            }
        )
    }

    render() {
        return (
            <>
                {this.state.xs.map(x => ReactDOM.createPortal(<Item name={x.name}/>, x.container)
                )}
                <button onClick={this.handler}>Click</button>
            </>
        )
    }
}

export default App;