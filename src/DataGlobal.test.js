import React from 'react';
import ReactDom from 'react-dom';
import DataGlobal, {CurrentWindowInnerWidthContext, CurrentFontSizeContext}
    from './DataGlobal';
import {act} from 'react-dom/test-utils';

const Children = () => {
    const currentWindowInnerWidth
        = React.useContext(CurrentWindowInnerWidthContext);
    const currentFontSize
        = React.useContext(CurrentFontSizeContext);

    return (
        <>
            <div id='currentWindowInnerWidth'>{currentWindowInnerWidth.toString()}</div>
            <div id='currentFontSize'>{currentFontSize.toString()}</div>
        </>
    )
};

test('resize window will modify state', (done) => {
    let container = document.createElement('div');
    document.body.appendChild(container);
    act(() => {
        ReactDom.render(<DataGlobal><Children/></DataGlobal>, container);
    });
    expect(document.getElementById('currentWindowInnerWidth').innerHTML)
        .toBe('300');
    expect(document.getElementById('currentFontSize').innerHTML)
        .toBe('16');
    act(() => {
        window.innerWidth = 500;
        window.dispatchEvent(new Event('resize'));
    })
    setTimeout(()=>{
        expect(document.getElementById('currentWindowInnerWidth').innerHTML)
            .toBe('500');
        done();
    },1000); // 第二个argument必须大于等于RESIZE_DONE_TIMEOUT
});

