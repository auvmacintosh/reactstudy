import React, {useState, useEffect} from 'react';

const App = () => {
    let [counter, setCounter] = useState(0);
    useEffect(()=>{
        setTimeout(()=> setCounter(1), 1000)
    }, [])
    return counter;
}

export default App;