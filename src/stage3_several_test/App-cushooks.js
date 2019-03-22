import React from 'react';
import 'normalize.css';

const useDocumentTitle = count => {
    React.useEffect(() => {
        document.title = count;
    }, [count]);
}
const AppCushooks = () => {
    const [count, setCount] = React.useState(1);
    useDocumentTitle(count);
    return <button onClick={() => setCount(count + 1)}>+1</button>
};

export default App;