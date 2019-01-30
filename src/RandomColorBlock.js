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
        this.props.setHeight(height);
    }
    render() {
        // 生成随机高度
        return (
            <div style={{
                width: '20rem',
                background: this.getRandomColor(),
                fontSize: '2rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
                ref={ (divElement) => this.divElement = divElement}
            >
                {/*{this.props.item._links.self.href.split('/').last()} {this.props.item.title}*/}
                {this.props.item.title}
            </div>
        )
    }
}

// 调用方法 <RandomColorBlock content={1} width={'20rem'}/>
RandomColorBlock.propTypes = {
    item: PropTypes.object, // Parent 定义 Block的宽度
}

export default RandomColorBlock;