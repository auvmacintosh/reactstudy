import React from 'react';

const B = React.memo(({c}) => {
    React.useEffect(() => {
        console.log(c + ' effect happened'); // initial render, later render(后)的时候执行
        return () => {
            console.log(c + ' cleanup happened')
        }; // later render(先)，unmount的时候执行
    });
    return <button onClick={() => 2}>wangboC1</button>
});

export default B;
