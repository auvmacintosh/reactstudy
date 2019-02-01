import React from 'react';
import PropTypes from "prop-types";

const getRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const style = {
    width: '20rem',
    fontSize: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const RandomColorBlock = ({item}) => {
    return (
        <div style={Object.assign({background: getRandomColor()}, style)}>
            {item._links.self.href.split('/').last()} {item.title}
        </div>
    )
};

// 调用方法 <RandomColorBlock item={item} />
RandomColorBlock.propTypes = {
    item: PropTypes.object,
};

export default RandomColorBlock;