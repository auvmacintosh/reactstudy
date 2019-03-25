import {useState, useEffect} from 'react';

const App = () => {
    let [ctr, setCtr] = useState('0');
    useEffect(()=>setCtr('1'), []);
    return ctr;
}

export default App;