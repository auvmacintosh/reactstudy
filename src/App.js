import React from 'react';
import 'normalize.css';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

let log = console.log.bind(console);

const UserContext = React.createContext({name: null});
const LocaleContext = React.createContext({language: 'en_US'});

const App = () => {
    const [user, setUser] = React.useState({name: null});
    const [locale, setLocale] = React.useState({language: 'en_US'});

    return (
        <Router>
            <UserContext.Provider value={user}>
                <LocaleContext.Provider value={locale}>
                    {user.name === null ? <Login/> : <Home/>}
                </LocaleContext.Provider>
            </UserContext.Provider>
        </Router>
    )
};

const Home = () => {
    return <div>home</div>
};

const Login = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const handler = (e) => {
        e.preventDefault();
        switch (e.target.name) {
            case 'username' :
                setUsername(e.target.value);
                break;
            case 'password' :
                setPassword(e.target.value);
                break;
            case 'submit' :
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = () => {};
                xhr.open('POST', 'http://localhost:8080/login', true)
                xhr.send();
                break;
        }
    };

    return (
        <form onSubmit={handler}>
            <input
                type='text'
                name='username'
                value={username}
                onChange={handler}
                placeholder='Name'
            />
            <input
                type='password'
                name='password'
                value={password}
                onChange={handler}
                placeholder='Password'
            />
            <button
                type="submit"
                name='submit'
            >Login</button>
        </form>
    )
};

export default App;