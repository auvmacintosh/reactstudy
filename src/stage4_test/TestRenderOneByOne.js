import React, {useState, useEffect} from 'react';

const A = () => {
    const [items, setItems] = useState([]);

    const handler = (e) => {
        e.preventDefault();
        // Promise.resolve([1,2,3]).then(res=>{res.forEach(i=>setItems(prev => prev.concat([i])))});
        setTimeout(()=>{
            [1,2,3].forEach(i=>setItems(prev => prev.concat([i])))
        },0);
    };

    return (
        <>
            <button onClick={handler}>fetch items</button>
            <C items={items}/>
        </>
    )
};

const B = ({items}) => {
    const [itemsOneByOne, setItemsOneByOne] = useState([]);

    useEffect(() => {
        if (itemsOneByOne.length < items.length) {
            for (let i = itemsOneByOne.length; i < items.length; i++) {
                setItemsOneByOne(prev => prev.concat([items[i]]));
            }
        }
    }, [items]);

    return <C itemsOneByOne={itemsOneByOne}/>
};

const C = ({items: items}) => {
    console.log('render C');
    return items.map(item => <div>{item}</div>);
};

export default A;
