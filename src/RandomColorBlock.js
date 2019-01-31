import React from 'react';
import PropTypes from "prop-types";

const getRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const RandomColorBlock = ({item}) => (
    <div style={{
        width: '20rem',
        background: getRandomColor(),
        fontSize: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }}
    >
        {item._links.self.href.split('/').last()} {item.title}
    </div>
)

// 调用方法 <RandomColorBlock item={item} />
RandomColorBlock.propTypes = {
    item: PropTypes.object,
};

export default RandomColorBlock;