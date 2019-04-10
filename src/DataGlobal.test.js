import React from 'react';
import ReactDom from 'react-dom';
import DataGlobal, {DEBOUNDING_TIMEOUT} from './DataGlobal';
import {act} from 'react-dom/test-utils';
import DataGlobalMockChildren from './DataGlobalMockChildren';

// getFirstLabelByInnerHTML will get this element if the pattern is /Window Inner Width: */
// <label>
//    {'Window Inner Width: '}
//    <span>{wiw.toString()}</span>
// </label>
const getFirstLabelByInnerHTMLPattern = pattern => {
    return Array.from(document.querySelectorAll('label')).find(el => pattern.test(el.innerHTML));
};

test('resize window inner width', (done) => {
    let container = document.createElement('div');
    document.body.appendChild(container);
    act(() => {
        ReactDom.render(<DataGlobal><DataGlobalMockChildren/></DataGlobal>, container);
    });
    const elementWiw = getFirstLabelByInnerHTMLPattern(/window inner width/i).lastChild;

    expect(elementWiw.innerHTML).toBe('300');

    act(() => {
        window.innerWidth = 500;
        window.dispatchEvent(new Event('resize'));
    });
    setTimeout(() => {
        expect(elementWiw.innerHTML).toBe('500');
        done();
    }, DEBOUNDING_TIMEOUT); // 第二个argument必须大于等于DEBOUNDING_TIMEOUT
});

