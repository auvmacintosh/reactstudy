import React from 'react';

export const CurrentWindowInnerWidthContext = React.createContext(300); //px
export const CurrentFontSizeContext = React.createContext(16); //px

const RESIZE_DONE_TIMEOUT = 1000; // 这么多ms没有resize以后才会开始重新布局
let resizeDone = -1;

const App = ({children}) => {
    const [currentWindowInnerWidth, setCurrentWindowInnerWidth] =
        React.useState(300);
    const [currentFontSize, setCurrentFontSize] =
        React.useState(16);
    const handleWindowEvent = (e) => {
        const handleResizeDone = () => {
            setCurrentWindowInnerWidth(
                window.innerWidth
            );
            setCurrentFontSize(
                parseInt(window.getComputedStyle(document.documentElement).fontSize.slice(0, -2))
            );
        };
        e.preventDefault();
        switch (e.type) {
            case "resize":
                clearTimeout(resizeDone);
                // RESIZE_DONE_TIMEOUT(例如100)ms没有resize以后再重新布局；
                resizeDone = setTimeout(handleResizeDone, RESIZE_DONE_TIMEOUT);
                break;
            default:
                console.log("no such event.");
        }
    };
    React.useEffect(() => {
        ['resize'].forEach(e => window.addEventListener(e, handleWindowEvent));
    }, []);

    return (
        <CurrentWindowInnerWidthContext.Provider value={currentWindowInnerWidth}>
            <CurrentFontSizeContext.Provider value={currentFontSize}>
                {children}
            </CurrentFontSizeContext.Provider>
        </CurrentWindowInnerWidthContext.Provider>
    )
};

export default App;