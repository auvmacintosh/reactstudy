import React from 'react';
import PropTypes from "prop-types";

class RandomHeightBlock extends React.Component {
    // 生成随机颜色
    getRandomColor = () => {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    render() {
        // 生成随机高度
        let height = (6 + Math.random() * 12) + 'rem';
        return (
            <div style={{
                width: this.props.width,
                height: height,
                background: this.getRandomColor(),
                fontSize: '5rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {this.props.id}
            </div>
        )
    }
}

// 调用方法 <RandomHeightBlock id={1} width={'20rem'}/>
RandomHeightBlock.propTypes = {
    id: PropTypes.number, // Parent 定义 Block里显示的内容
    width: PropTypes.string, // Parent 定义 Block的宽度
}

export default RandomHeightBlock;