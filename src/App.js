import React from 'react';
import 'normalize.css';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

let log = console.log.bind(console);

const App = () => {
    return (
        <Router>
            <>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/login/:id'>Login</Link></li>
                </ul>
                <div>
                    <Route exact={true} path='/' component={Home}/>
                    <Route path='/login/:id' component={Login}/>
                </div>
            </>
        </Router>
    )
};

const Home = () => {
    return <div>home</div>
};

const Login = (props) => {
    return <div>login</div>
};

export default App;