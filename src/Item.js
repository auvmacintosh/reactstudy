import React from 'react';
import PropTypes from "prop-types";

const itemStyle = {
    background: 'grey',
    fontSize: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const Item = ({item}) => (
    <div style={itemStyle}>
        {item._links.self.href.split('/').tail()} {item.title}
    </div>
);

// 调用方法 <Item item={item} />
Item.propTypes = {
    item: PropTypes.object,
};

export default Item;