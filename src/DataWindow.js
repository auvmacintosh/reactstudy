import React, {useState, useEffect} from 'react';

export const ContextWiw = React.createContext(300); // px Window InnerwidthContext
export const ContextFs = React.createContext(16); // px Fontsize大小Context
const DEBOUNDING_TIMEOUT = 1000; // 这么多ms没有resize以后才会开始重新布局
let debouncingTimer = -1; // resize debouncing timer

const App = ({children}) => {
    const [stateWiw, setWiw] = useState(300); // 窗口宽度state
    const [stateFs, setFs] = useState(16); // 字体大小state

    const handleEventDone = () => {
        setWiw(window.innerWidth);
        setFs(parseFloat(window.getComputedStyle(document.body).fontSize));
    };
    const windowEventHandler = (e) => {
        e.preventDefault();
        switch (e.type) {
            case 'resize':
                clearTimeout(debouncingTimer);
                // RESIZE_DONE_TIMEOUT(例如100)ms没有resize以后再重新布局；
                debouncingTimer = setTimeout(handleEventDone(), DEBOUNDING_TIMEOUT);
                break;
            default:
                throw(new Error('No such event.'));
        }
    };

    useEffect(() => {
        ['resize'].forEach(e => window.addEventListener(e, windowEventHandler));
        return () => {
            ['resize'].forEach(e => window.removeEventListener(e, windowEventHandler));
        };
    }, []);


    return (
        <ContextWiw.Provider value={stateWiw}>
            <ContextFs.Provider value={stateFs}>
                {children}
            </ContextFs.Provider>
        </ContextWiw.Provider>
    )
};

export default App;