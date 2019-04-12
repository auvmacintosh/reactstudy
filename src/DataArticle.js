import React, {useState, useEffect} from 'react';
import getXs from './utility/getXs'

const PAGE_SIZE = 10; // 每次拉到底的page size，本来想第一次刷新多一些，后来发现page no不好算
let nextPage = 0; // getXs的页号
const controller = new AbortController();

const DataArticle = () => {
    const [items, setItems] = useState([]);

    const windowEventHandler = (e) => {
        e.preventDefault();
        switch (e.type) {
            case 'scroll':
                ifReachBottom(controller.signal);
                break;
            case 'resize':
                ifReachBottom(controller.signal);
                break;
            default:
                throw(new Error('No such event ' + e.type));
        }
    };

    const ifReachBottom = signal => {
        // 需要用>=判断，如果用===判断，页面比窗口短的时候或者有滚动条的时候，就不会触发。
        // 但是用>=有一个问题就是会连续触发，这时候需要先removeEventListener再add上去
        // +n的原因是，这个尺寸的测量值不准，所以必须得留富裕
        if ((window.innerHeight + window.scrollY + 10) >= document.body.clientHeight) {
            // remove不存在的eventListener不会报错
            window.removeEventListener('scroll', windowEventHandler);
            getXs('/api/articles')(signal, nextPage++, PAGE_SIZE).then(response => {
                setItems(prev => prev.concat(response.xs));
                // 相同事件，相同callback的多次addEventListener只会被加一次
                window.addEventListener('scroll', windowEventHandler);
                ifReachBottom(); // Asynchronous Recursive
            });
        }
    };

    useEffect(() => {
        ['scroll', 'resize'].forEach(e => window.addEventListener(e, windowEventHandler));
        ifReachBottom(controller.signal);
        return () => {
            ['scroll', 'resize'].forEach(e => window.removeEventListener(e, windowEventHandler));
            controller.abort();
        };
    }, []);

    const spinnerStyle = {
        padding: '10px',
    };

    const columnStyle = {
        display: 'flex',
        flexDirection: 'column',
    };

    return (
        <div style={columnStyle}>
            {items.map((item, i) => <div key={i}>{item._links.self.href.split('/').tail() + item.title}</div>)}
            <div style={spinnerStyle}></div>
        </div>
    );
};

export default DataArticle;