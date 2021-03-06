import React, {useState, useEffect} from 'react';
import InfiniteListConcatOneItemEachTime from "./InfiniteListConcatOneItemEachTime";

export const DEBOUNDING_TIMEOUT = 500; // 这么多ms没有resize以后才会开始重新布局
let debouncingTimer = -1; // resize debouncing timer

const WindowState = () => {
    const [wiw, setWiw] = useState(window.innerWidth); // 窗口宽度state
    const [fs, setFs] = useState(parseFloat(window.getComputedStyle(document.body).fontSize)); // 字体大小state

    const handleEventDone = () => {
        console.debug('setWiw and setFs');
        setWiw(window.innerWidth);
        setFs(parseFloat(window.getComputedStyle(document.body).fontSize));
    };
    const windowEventHandler = (e) => {
        e.preventDefault();
        switch (e.type) {
            case 'resize':
                clearTimeout(debouncingTimer);
                // RESIZE_DONE_TIMEOUT(例如100)ms没有resize以后再重新布局；
                debouncingTimer = setTimeout(handleEventDone, DEBOUNDING_TIMEOUT);
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
        <>
            <InfiniteListConcatOneItemEachTime fs={fs} wiw={wiw}/>
        </>
    )
};

export default WindowState;