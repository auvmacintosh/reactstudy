import React from 'react';
import 'normalize.css';
import B from './B'
// const B = React.lazy(() => import('./B'));

const getRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const App = () => {
    const [c1, setC1] = React.useState(1);
    const [c2, setC2] = React.useState(1);

    const f = React.useRef(() => {
        console.log('run f')
    });
    return (
        <>
            <div>{c1}</div>
            <div>{c2}</div>
            <React.Suspense fallback={<div>Loading...</div>}>
                <B f={f.current} c1={c1} setC1={setC1}>wangboC1</B>
                <B f={f.current} c1={c2} setC1={setC2}>wangboC2</B>
            </React.Suspense>
        </>
    )
};

export default App;