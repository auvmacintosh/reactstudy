import React from 'react';
import PropTypes from "prop-types";
import s from "styled-components";

const getRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const Div = s.div`
    font-size: 2rem;
    display: flex;
    justify-content: center;
    alignItems: center;
`;

const RandomColorBlock = ({item}) => (
    <Div style={{background: getRandomColor()}}>
        {item._links.self.href.split('/').last()} {item.title}
    </Div>
);

// 调用方法 <RandomColorBlock item={item} />
RandomColorBlock.propTypes = {
    item: PropTypes.object,
};

export default RandomColorBlock;