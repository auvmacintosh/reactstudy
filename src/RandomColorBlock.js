import React from 'react';
import PropTypes from "prop-types";
import S from "styled-components";

const getRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

// styled-component 可以传函数，之前给getRandomColor()，只能生成一个颜色
const Div = S.div`
    background: ${getRandomColor};
    font-size: 2rem;
    display: flex;
    justify-content: center;
    alignItems: center;
`;

const RandomColorBlock = ({item, MARGIN}) => (
    <Div>
        {item._links.self.href.split('/').last()} {item.title}
    </Div>
);

// 调用方法 <RandomColorBlock item={item} />
RandomColorBlock.propTypes = {
    item: PropTypes.object,
};

export default RandomColorBlock;