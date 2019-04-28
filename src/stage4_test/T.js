import React, {useState, useEffect} from 'react';

const T = () => {
    const [state, setState] = useState(0);
    console.log(state);
    if (state < 6) {
        setState(prev => prev + 1);
    }
    console.log(state);

    useEffect(() => {
        console.log('T useEffect');
        return () => {
            console.log('T useEffect return')
        }
    }, []);
    console.log('T render')
    return (
        <>
            T
            {state}
            <A/>
        </>
    )
};
const A = () => {
    useEffect(() => {
        console.log('A useEffect');
        return () => {
            console.log('A useEffect return')
        }
    }, []);
    console.log('A render')
    return (
        <>
            A
        </>
    )
};
export default T;