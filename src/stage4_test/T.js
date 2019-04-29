import React, {useState, useEffect} from 'react';

const T = () => {
    const [state, setState] = useState(0);

    useEffect(() => {
        console.log('T useEffect');
        console.log(state);
        if (state < 6) {
            setState(prev => prev + 1);
        }
        return () => {
            console.log('T useEffect return')
        }
    }, [state]);
    console.log('T render')
    return (
        <>
            T
            {state}
            <A state={state}/>
        </>
    )
};
const A = ({state}) => {
    useEffect(() => {
        console.log('A useEffect');
        return () => {
            console.log('A useEffect return')
        }
    }, [state]);
    console.log('A render')
    return (
        <>
            A
            {state}
        </>
    )
};
export default T;