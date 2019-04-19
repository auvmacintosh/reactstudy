import React from 'react';
import ReactDom from 'react-dom';
import {act} from 'react-dom/test-utils';
import GlobalState from './GlobalState';
import {ContextFs, ContextWiw} from "./GlobalState";

// getFirstLabelByInnerHTML will get this element if the pattern is /Window Inner Width: */
// <label>
//    {'Window Inner Width: '}
//    <span>{wiw.toString()}</span>
// </label>
const getFirstLabelByInnerHTMLPattern = pattern => {
    return Array.from(document.querySelectorAll('label')).find(el => pattern.test(el.innerHTML));
};

const GlobalStateMockChildren = () => {
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

let container = document.createElement('div');
document.body.appendChild(container);
let elementWiw;
let elementFs;

describe('GlobalState Component', () => {
        act(() => {
            ReactDom.render(
                <GlobalState>
                    <GlobalStateMockChildren/>
                </GlobalState>
                , container);
        });
        elementWiw = getFirstLabelByInnerHTMLPattern(/window inner width/i).lastChild;
        elementFs = getFirstLabelByInnerHTMLPattern(/font size/i).lastChild;

        test('resize window inner width', (done) => {
            window.innerWidth = 500;
            act(() => {
                window.dispatchEvent(new Event('resize'));
            });
            setTimeout(() => {
                expect(elementWiw.innerHTML).toBe('500');
                done();
            }, 0);
        });

        test('change fontsize', (done) => {
            window.getComputedStyle = () => ({fontSize: '18px'});
            act(() => {
                window.dispatchEvent(new Event('resize'));
            });
            setTimeout(() => {
                expect(elementFs.innerHTML).toBe('18');
                done();
            }, 0);
        });
    }
);

test('remove eventListener when unmount', (done) => {
    // eventListener有没有被remove就没法测，因为js就没提供getEventListener功能
    act(() => {
        ReactDom.unmountComponentAtNode(container);
    });
    setTimeout(() => {
        done();
    }, 0);
});
