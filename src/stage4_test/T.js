import React, {useState, useEffect} from 'react';

const T = () => {
    const [state, setState] = useState(0);

    useEffect(() => {
        console.debug('T useEffect');
        console.debug(state);
        if (state < 6) {
            setState(prev => prev + 1);
        }
        return () => {
            console.debug('T useEffect return')
        }
    }, [state]);
    console.debug('T render')
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
        console.debug('A useEffect');
        return () => {
            console.debug('A useEffect return')
        }
    }, [state]);
    console.debug('A render')
    return (
        <>
            A
            {state}
        </>
    )
};
export default T;