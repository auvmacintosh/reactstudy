import React from 'react';
import ReactDom from 'react-dom';
import {act} from 'react-dom/test-utils';
import snapshotRender from 'react-test-renderer';
import DataGlobal from './DataWindow';
import {ContextFs, ContextWiw} from "./DataWindow";

// getFirstLabelByInnerHTML will get this element if the pattern is /Window Inner Width: */
// <label>
//    {'Window Inner Width: '}
//    <span>{wiw.toString()}</span>
// </label>
const getFirstLabelByInnerHTMLPattern = pattern => {
    return Array.from(document.querySelectorAll('label')).find(el => pattern.test(el.innerHTML));
};

const DataWindowMockChildren = () => {
    const wiw = React.useContext(ContextWiw); // Window inner width
    const fs = React.useContext(ContextFs); // Font size

    return (
        <>
            <label>
                {'Window Inner Width: '}
                <span>{wiw.toString()}</span>
            </label>
            <br/>
            <label>
                {'Font Size: '}
                <span>{fs.toString()}</span>
            </label>
        </>
    )
};

describe('DataWindow Component', () => {
        let container = document.createElement('div');
        document.body.appendChild(container);
        act(() => {
            ReactDom.render(<DataGlobal><DataWindowMockChildren/></DataGlobal>, container);
        });
        const elementWiw = getFirstLabelByInnerHTMLPattern(/window inner width/i).lastChild;
        const elementFs = getFirstLabelByInnerHTMLPattern(/font size/i).lastChild;

        test('initial state', () => {
            expect(elementWiw.innerHTML).toBe('300');
            expect(elementFs.innerHTML).toBe('16');
        });

        test('resize window inner width', () => {
            window.innerWidth = 500;
            act(() => {
                window.dispatchEvent(new Event('resize'));
            });
            expect(elementWiw.innerHTML).toBe('500');
        });

        test('change fontsize', () => {
            window.getComputedStyle = () => ({fontSize: '18px'});
            act(() => {
                window.dispatchEvent(new Event('resize'));
            });
            expect(elementFs.innerHTML).toBe('18');
        });
    }
);
