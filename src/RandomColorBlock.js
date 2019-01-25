import React from 'react';
import PropTypes from "prop-types";

class RandomColorBlock extends React.Component {
    // 生成随机颜色
    getRandomColor = () => {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    componentDidMount() {
        const height = this.divElement.clientHeight;
        this.props.updateHeights(height);
    }

    render() {
        // 生成随机高度
        return (
            <div style={{
                width: this.props.width,
                height: this.props.height + 'rem',
                background: this.getRandomColor(),
                fontSize: '5rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
                ref={ (divElement) => this.divElement = divElement}
            >
                {this.props.id}
            </div>
        )
    }
}

// 调用方法 <RandomColorBlock id={1} width={'20rem'}/>
RandomColorBlock.propTypes = {
    id: PropTypes.string, // Parent 定义 Block里显示的内容
    width: PropTypes.string, // Parent 定义 Block的宽度
    height: PropTypes.number, // Parent 定义 Block的高度
    updateHeights: PropTypes.func,
}

export default RandomColorBlock;