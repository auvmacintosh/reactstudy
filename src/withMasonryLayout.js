import React from 'react';
import PropTypes from "prop-types";
import {compose, map} from "ramda";

const withSetHeightOnDidMount = setHeight => {
    return class ItemWithComponentAndSetHeight extends React.Component {
        componentDidMount() {
            const height = this.divElement.clientHeight;
            setHeight(height);
        }

        render() {
            return (
                <div ref={(divElement) => this.divElement = divElement}>
                    {this.props.children}
                </div>
            )
        }
    }
}

const withMasonryLayout = Component => {
    class ComponentWithMasonryLayout extends React.Component {
        constructor(props) {
            super(props);
            this.columnNo = 3;
            this.items = []; // 一维数组，记录的是所有的items
            this.itemHeights = [];

            this.layouts = {};
            this.layouts[this.columnNo] = {
                itemIndexMatrix: [...Array(this.columnNo)].map(() => []), // 二维数组，存的是每列包含的那部分xs的indexInAllXs
                columnHeights: Array(this.columnNo).fill(0), // 一维数组，每列的高度。
                lastItemIndex: -1,
            };

            this.state = {
                itemIndexMatrix: this.layouts[this.columnNo].itemIndexMatrix
            };
        }

        get layout() {
            return this.layouts[this.columnNo];
        }

        get shortestColumnIndex() {
            return this.layout.columnHeights.indexOf(
                Math.min(...this.layout.columnHeights));
        }

        set item(item) {
            this.layout.itemIndexMatrix[this.shortestColumnIndex].push(this.items.push(item) - 1);
        };

        setHeight = height => {
            this.itemHeights.push(height);
            this.layout.columnHeights[this.shortestColumnIndex] += height;
        };

        getItem = i => this.items[i];

        componentDidMount() {
            this.props.getXs().then(response => {
                response.xs.forEach((x) => {
                    this.item = x;
                    this.setState(prevState => prevState);
                });
            });
            // window.addEventListener('resize', this.handleWindowResize)
        }

        // componentWillUnmount() {
        //     window.removeEventListener('resize', this.handleWindowResize)
        // }
        //
        // handleWindowResize = () => {
        //     console.log("resize")
        // };
        //
        // handleScrolledToBottom = () => {
        // };

        Table = columns => (
            <div style={{display: 'flex', flexDirection: 'row',}}>
                {columns}
            </div>
        );

        Column = items => (
            <div style={{display: 'flex', flexDirection: 'column', width: '20rem',}}>
                {items}
            </div>
        );

        ComponentWithSetHeightOnDidMount = withSetHeightOnDidMount(this.setHeight);
        Item = item => (
            <this.ComponentWithSetHeightOnDidMount>
                <Component item={item}/>
            </this.ComponentWithSetHeightOnDidMount>
        );

        render() {
            return (
                <>
                    {
                        // map(f)就是一层递归，也就是对Array里的每个元素使用f函数
                        // map(map(f))就是两层递归
                        compose( // compose的作用就是把下边的函数串联起来
                            this.Table, // 打包一个table
                            map(this.Column), // 打包n个列
                            map(map(this.Item)), // 打包n*m个Item
                            map(map(this.getItem)) // 根据index查出对应的对象
                        )(this.state.itemIndexMatrix) // 输入是一个n*m维的矩阵，每个元素都是index
                    }
                </>
            )
        }
    }

    ComponentWithMasonryLayout.propTypes = {
        getXs: PropTypes.func.isRequired,
    };

    return ComponentWithMasonryLayout;
};

export default withMasonryLayout;
