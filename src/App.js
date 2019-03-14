import React from 'react';
import 'normalize.css';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

let log = console.log.bind(console);

const UserContext = React.createContext({username: null});
const LocaleContext = React.createContext({language: 'en_US'});

const App = () => {
    const [user, setUser] = React.useState({username: null});
    const [locale, setLocale] = React.useState({language: 'en_US'});

    return (
        <Router>
            <UserContext.Provider value={{...user, setUser: setUser}}>
                <LocaleContext.Provider value={{...locale, setLocale: setLocale}}>
                    {user.username === null ? <Login/> : <Home/>}
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
    const userContext = React.useContext(UserContext);
    const xhr = new XMLHttpRequest();
    React.useEffect(() => {
        return () => xhr.abort();
    }, []);

    const handler = (e) => {
        e.preventDefault();
        switch (e.target.name) {
            case 'username' :
                setUsername(e.target.value);
                break;
            case 'password' :
                setPassword(e.target.value);
                break;
            case 'login' :
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        log('200')
                        userContext.setUser({username: username})
                    } else if (xhr.status === 302) {
                        log('302')
                    } else if (xhr.status === 403) {
                        log('403')
                    }
                };
                xhr.open('POST', 'http://localhost:8080/login', true);
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
                xhr.send(`username=${username}&password=${password}`);
                break;
            default :
                log('no such handler ' + e.target.name);
        }
    };

    return (
        <form name='login' onSubmit={handler}>
            <input
                type='text'
                name='username'
                value={username}
                onChange={handler}
                placeholder='Username'
            />
            <input
                type='password'
                name='password'
                value={password}
                onChange={handler}
                placeholder='Password'
            />
            <button type="submit">Login</button>
        </form>
    )
};

export default App;