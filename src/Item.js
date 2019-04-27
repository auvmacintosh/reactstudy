import React from 'react';
import PropTypes from "prop-types";
import S from "styled-components";

// background: ${getRandomColor};
// styled-component 可以传函数，之前给getRandomColor()，只能生成一个颜色
const Div = S.div`
    background: grey;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    alignItems: center;
`;

const Item = ({item}) => (
    <Div>
        {item._links.self.href.split('/').last()} {item.title}
    </Div>
);

// 调用方法 <Item item={item} />
Item.propTypes = {
    item: PropTypes.object,
};

export default Item;