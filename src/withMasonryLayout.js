import React from 'react';
import PropTypes from "prop-types";
import * as R from "ramda";
import S from 'styled-components';

const INITIAL_COLUMN_NO = 3;
const COLUMN_WIDTH = 20; // rem

const StyledTable = S.div`
display: flex; 
justify-content: center; 
min-width: ${props => COLUMN_WIDTH * props.columnNo + 'rem'};
`;
const StyledColumn = S.div`
display: flex; 
flex-direction: column; 
width: ${COLUMN_WIDTH + 'rem'};
`;
const idxMp = R.addIndex(R.map);

const withMasonryLayout = Component => {
    class ComponentWithMasonryLayout extends React.Component {
        constructor(props) {
            super(props);
            this.columnNo = INITIAL_COLUMN_NO;
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


        // Table = columns => (<DivT> {columns} </DivT>);
        Table = columns => (
            <StyledTable columnNo={this.columnNo}>
                {columns}
            </StyledTable>
        );

        Column = (items, i) => (
            <StyledColumn key={i}>
                {items}
            </StyledColumn>
        );

        Item = (item, i) => (
            <ItemClass key={i} setHeight={this.setHeight}>
                <Component item={item}/>
            </ItemClass>
        );

        render() {
            return (
                // map(f)就是一层递归，也就是对Array里的每个元素使用f函数
                // map(map(f))就是两层递归
                R.compose( // compose的作用就是把下边的函数串联起来
                    this.Table, // 打包一个table
                    idxMp(this.Column), // 打包n个列
                    R.map(idxMp(this.Item)), // 打包n*m个Item
                    R.map(R.map(this.getItem)) // 根据index查出对应的对象
                )(this.state.itemIndexMatrix) // 输入是一个n*m维的矩阵，每个元素都是index
            )
        }
    }

    ComponentWithMasonryLayout.propTypes = {
        getXs: PropTypes.func.isRequired,
    };

    return ComponentWithMasonryLayout;
};

class ItemClass extends React.Component {
    componentDidMount() {
        const height = this.divEl.clientHeight;
        this.props.setHeight(height);
    }

    render() {
        return (
            <div style={{padding: '0', margin: '0', border: '0'}} ref={el => this.divEl = el}>
                {this.props.children}
            </div>
        )
    }
}

ItemClass.propTypes = {
    setHeight: PropTypes.func.isRequired,
};

export default withMasonryLayout;
