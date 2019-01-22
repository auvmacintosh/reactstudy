import React, {Component} from 'react';

class Login extends Component {
    render() {
        return (
            <form action="http://localhost:8080/login" method="POST">
                <label>
                    User:
                    <input type="text" name="username" id="user"/>
                </label>
                <label>
                    Password:
                    <input type="text" name="password" id="password"/>
                </label>
                <button type="submit">Login</button>
                {/*<input name="submit" type="submit" value="Login"/>*/}
                {/*<input name="_csrf" type="hidden" value="32b8e84f-529a-4fb3-82d4-3a4c1949c586" />*/}
            </form>
        )
    }
}

export default Login;