import React, {Component} from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {temp: 2};
    }

    handler = (e) => {
        this.setState(ps => ps + 1)
    }

    componentWillReceiveProps() {
        console.log('ParentWillReceiveProps')
    }
    componentWillUpdate() {
        console.log('ParentWillUpdate')
    }
    componentWillUnmount() {
        console.log('ParentWillUnmount');
    }

    componentWillMount() {
        console.log('ParentWillMound');
    }

    componentDidMount() {
        console.log('ParentDidMount')
    }

    render() {
        return (
            <>
                <form action="http://localhost:8080/login" method="POST">
                    <label>
                        User:
                        <Inp f={this.state.temp}/>
                        {/*<Inp />*/}
                    </label>

                    <label>
                        Password:
                        <input type="text" name="password" id="password"/>
                    </label>
                    <button type="submit">Login</button>
                    {/*<input name="submit" type="submit" value="Login"/>*/}
                    {/*<input name="_csrf" type="hidden" value="32b8e84f-529a-4fb3-82d4-3a4c1949c586" />*/}
                </form>
                <button onClick={this.handler}>ddddd</button>
                <p>uuuu</p>
            </>
        )
    }
}

class Inp extends Component {
    constructor(props) {
        super(props);
        this.state = {userName: ''};
    }

    componentWillReceiveProps() {
        console.log('ChildWillReceiveProps')
    }
    componentWillUpdate() {
        console.log('ChildWillUpdate')
    }

    componentWillUnmount() {
        console.log('ChildWillUnmount');
    }

    componentWillMount() {
        console.log('ChildWillMound');
    }

    componentDidMount() {
        console.log('ChildDidMount')
    }

    handler = e => {
        e.preventDefault();
        this.setState({userName: e.target.value})
    };

    render() {return (<input
        value={this.state.userName}
        onChange={this.handler}
        type="text" name={this.props.f} id="user"/>
    )}

}

export default Login;