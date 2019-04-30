import React, {useState, useEffect, useContext} from 'react';
import getXs, {adaptorSDR} from './utility/getXs'
import CellArrangement from "./CellArrangement";

const PAGE_SIZE = 10; // 每次拉到底的page size，本来想第一次刷新多一些，后来发现page no不好算
let nextPage = 0; // getXs的页号
const controller = new AbortController();

const InfiniteListConcatOneItemEachTime = ({fs, wiw}) => {
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
        console.debug('check if reach bottom');
        // 需要用>=判断，如果用===判断，页面比窗口短的时候或者有滚动条的时候，就不会触发。
        // 但是用>=有一个问题就是会连续触发，这时候需要先removeEventListener再add上去
        // +n的原因是，这个尺寸的测量值不准，所以必须得留富裕
        if ((window.innerHeight + window.scrollY + 10) >= document.body.clientHeight) {
            console.debug('getXs');
            // if ((window.innerHeight + window.scrollY + 10) >= document.body.clientHeight) {
            ['scroll', 'resize'].forEach(e => window.removeEventListener(e, windowEventHandler));
            // remove不存在的eventListener不会报错
            const apiUrl = '/api/articles';
            getXs(apiUrl)(signal, nextPage++, PAGE_SIZE)
                .then(adaptorSDR(apiUrl))
                .then(response => {
                    // 本来想写一个通用的InfiniteList，就是用下边这句代替再下边的for：
                    // setItems(prev => prev.concat(response.xs));
                    // 但是后来发现，写在这里有几个好处：
                    // 1. 一个scroll或者resize event触发这个循环，这个循环又会触发这个render，
                    // 但是因为下次再调用这个render的时候，不会有event，所以不会再次触发这个循环，如果没有event这个机制，
                    // 就变成recursive的了。
                    // 2. 这段必须得是async的，不然的话，它会把10个setItems都跑完，再跑整个渲染，
                    // 就不是我们的初衷了，我们的初衷是跑1个setItems，跑一个渲染，getXs后边天然就是async的，因为在
                    // then里，不用在人为的setTimeout之类的了。
                    for (let i = 0; i < response.xs.length; i++) { // 有新下载的内容
                        setItems(prev => prev.concat(response.xs[i]));
                    }
                    // 相同事件，相同callback的多次addEventListener只会被加一次
                    ifReachBottom(signal); // Recursive
                })
        } else {
            ['scroll', 'resize'].forEach(e => window.addEventListener(e, windowEventHandler));
        }
    };

    useEffect(()=>{
        ['scroll', 'resize'].forEach(e => window.addEventListener(e, windowEventHandler));
        return () => {
            ['scroll', 'resize'].forEach(e => window.removeEventListener(e, windowEventHandler));
            controller.abort();
        };
    },[]);

    useEffect(() => {
        ifReachBottom(controller.signal);
    }, [fs, wiw]);

    return (
        <CellArrangement items={items} fs={fs} wiw={wiw}/>
    )
    // return ( // simplest component, just for test
    //     <>
    //         {items.map((item, idx) =>
    //             <div key={idx}>
    //                 {item._links.self.href.split('/').tail()} {item.title}
    //             </div>
    //         )}
    //     </>
    // )

};

export default InfiniteListConcatOneItemEachTime;