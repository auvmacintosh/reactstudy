import React from 'react';
import 'normalize.css';
// import("./workerURL").then(modual => {
//     const workerInstance = new Worker(modual.default);
//     workerInstance.onmessage = e => {
//         console.log('Message received from workerURL script: ' + e.data);
//     }
//     workerInstance.postMessage("hello world!");
// });
// import workerURL from "./workerURL";
// const workerInstance = new Worker(workerURL);
// workerInstance.onmessage = e => {
//     console.log('Message received from workerURL script: ' + e.data);
// }
// workerInstance.postMessage("hello world!");

const importB= import('./B');
const B = React.lazy(() => importB);
// const importC = import('./C');
// const C = React.lazy(() => importC);

let C=import('./C').then(module => {
    return module.default
});
console.log(C)

const App = () => {
    const [c1, setC1] = React.useState(1);
    return (
        <>
            <div>{c1}</div>
            <React.Suspense fallback={<div>Loading...</div>}>
                {c1 === 1 ? <B c={c1}/> : <C/>}
            </React.Suspense>
            <button onClick={() => setC1(c1 + 1)}>change c1</button>
        </>
    )
};

export default App;