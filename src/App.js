import React, {useState} from 'react';
import B from './B'

const App = ({page, children}) => {
    const [status, setStatus] = useState('leave');
    const handleMouseEnter = e => {
        // e.preventDefault();
        setStatus('enter');
    };
    const handleMouseLeave = e => {
        // e.preventDefault();
        setStatus('leave');
    };
    return (
        <>
            {children}
            <a className={status}
               href={page}
               onMouseEnter={handleMouseEnter}
               onMouseLeave={handleMouseLeave}
            >{status}</a>
            <B/>
        </>
    );
}

export default App;