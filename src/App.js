import React from 'react';
import 'normalize.css';

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

    shouldComponentUpdate(np, ns) {
        return this.props.name !== np.name;
    }

    render() {
        log(this.name + ' render')
        return <div>{this.props.name}</div>
    }
}

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