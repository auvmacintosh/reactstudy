import React from 'react';

const B = React.memo(({f, c1, setC1, children}) => {
    f();
    React.useEffect(() => {
        console.log(children + ' effect happened'); // initial render, later render(后)的时候执行
        return () => {
            console.log(children + ' cleanup happened')
        }; // later render(先)，unmount的时候执行
    });
    return <button onClick={() => setC1(c1 + 1)}>{children}</button>
});

export default B;
