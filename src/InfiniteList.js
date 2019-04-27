import React, {useState, useEffect} from 'react';
import getXs, {adaptorSDR} from './utility/getXs'
import CellArrangement from "./CellArrangement";

const PAGE_SIZE = 10; // 每次拉到底的page size，本来想第一次刷新多一些，后来发现page no不好算
let nextPage = 0; // getXs的页号
const controller = new AbortController();

const InfiniteList = () => {
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
                throw(new Error('No such handler ' + e.type));
        }
    };

    const ifReachBottom = signal => {
        // 需要用>=判断，如果用===判断，页面比窗口短的时候或者有滚动条的时候，就不会触发。
        // 但是用>=有一个问题就是会连续触发，这时候需要先removeEventListener再add上去
        // +n的原因是，这个尺寸的测量值不准，所以必须得留富裕
        if ((window.innerHeight + window.scrollY + 10) >= document.body.clientHeight) {
            // if ((window.innerHeight + window.scrollY + 10) >= document.body.clientHeight) {
            ['scroll', 'resize'].forEach(e => window.removeEventListener(e, windowEventHandler));
            // remove不存在的eventListener不会报错
            const apiUrl = '/api/articles';
            getXs(apiUrl)(signal, nextPage++, PAGE_SIZE)
                .then(adaptorSDR(apiUrl))
                .then(response => {
                    setItems(prev => prev.concat(response.xs));
                    // 相同事件，相同callback的多次addEventListener只会被加一次
                    ifReachBottom(signal); // Recursive
                })
        } else {
            ['scroll', 'resize'].forEach(e => window.addEventListener(e, windowEventHandler));
        }
    };

    useEffect(() => {
        ifReachBottom(controller.signal);
        ['scroll', 'resize'].forEach(e => window.addEventListener(e, windowEventHandler));
        return () => {
            ['scroll', 'resize'].forEach(e => window.removeEventListener(e, windowEventHandler));
            controller.abort();
        };
    }, []);

    return (
        <CellArrangement items={items}/>
    )

};

export default InfiniteList;