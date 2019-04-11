import React from 'react';
import ReactDom from 'react-dom';
import {act} from 'react-dom/test-utils';
import DataGlobal from './DataGlobal';
import DataGlobalMockChildren from './DataGlobalMockChildren';

// getFirstLabelByInnerHTML will get this element if the pattern is /Window Inner Width: */
// <label>
//    {'Window Inner Width: '}
//    <span>{wiw.toString()}</span>
// </label>
const getFirstLabelByInnerHTMLPattern = pattern => {
    return Array.from(document.querySelectorAll('label')).find(el => pattern.test(el.innerHTML));
};

describe('DataGlobal Component', () => {
        let container = document.createElement('div');
        document.body.appendChild(container);
        act(() => {
            ReactDom.render(<DataGlobal><DataGlobalMockChildren/></DataGlobal>, container);
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


