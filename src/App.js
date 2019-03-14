import React from 'react';
import 'normalize.css';

const App = () => {
    const [c1, setC1] = React.useState(1);
    const [c2, setC2] = React.useState(1);

    return (
        <>
            <div>{c1}</div>
            <div>{c2}</div>
            <B c1={c1} setC1={setC1}>C1</B>
            <B c1={c2} setC1={setC2}>C2</B>
        </>
    )
};

const B = React.memo(({c1, setC1, children}) => {
    React.useEffect(() => {
        console.log(children + ' effect happened'); // initial render, later render(后)的时候执行
        return () => {
            console.log(children + ' cleanup happened')
        }; // later render(先)，unmount的时候执行
    });
    return <button onClick={() => setC1(c1 + 1)}>{children}</button>
});

export default App;