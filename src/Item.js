import React from 'react';
import PropTypes from "prop-types";

const titleStyle = {
    padding: '0.4rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    wordBreak: 'break-word',
    hyphens: 'auto',
    overflow: 'hidden',
};
const contentStyle = {
    padding: '0.4rem',
    borderRadius: '0.2rem',
    background: '#e0f0f0',
    fontSize: '1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    wordBreak: 'break-word',
    overflow: 'hidden',
};

const Item = ({item}) => {
    return (
        <>
            <div style={titleStyle}>
                {item.id} {item.title}
            </div>
            <div style={contentStyle}>
                {item.content}
            </div>
        </>
    )
    // return <div>hello</div>
};

// 调用方法 <Item item={item} />
Item.propTypes = {
    item: PropTypes.object,
};

export default Item;