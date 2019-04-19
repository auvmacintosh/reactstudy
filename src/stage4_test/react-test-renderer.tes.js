import React, {useEffect} from 'react';
import TestRenderer from 'react-test-renderer';

const App = () => {
    useEffect(() => {
        console.log('mount');
        return console.log('unmount');
    }, []);
    return (
        <div>
            <button id='id' onClick={() => {
                console.log('click');
            }}>click me</button>
        </div>
    )
};


test('test react test TestRenderer', () => {
    console.log('start test function');
    const renderer = TestRenderer.create(<App/>);
    // 没有dom所以也就没法用document里的selector，下边这句get不到任何element
    // document.getElementById('id').dispatchEvent(new MouseEvent('click'), {bubbles: true});
    let instance = renderer.root;
    // 需要注意，find只能匹配一个，如果返回0个或者多个，就会报错。
    const button = instance.find(el => el.type == 'button');
    button.props.onClick();
    renderer.unmount(); // 奇怪，unmount的时候会把mount的lifeevent也执行了。
});