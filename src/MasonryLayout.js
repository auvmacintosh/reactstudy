import React, {useState} from 'react';
import PropTypes from "prop-types";
import * as R from "ramda";
import {HALF_GAP, COLUMN_WIDTH} from "./CellArrangement";
const idxMp = R.addIndex(R.map);

const MasonryLayout = ({matrix, getItem, itemIndexUnderUpdating, pushCellHeight, pushOffsetBottom, children}) => {

    const table = columns => (
        <div style={this.state.tableStyle}>
            {columns}
        </div>
    );

    const column = (items, i) => (
        <div key={i} style={this.columnStyle}>
            {items}
        </div>
    );

    const cell = (item, i) => (
        <CellClass key={i} setHeight={this.setHeight}>
            <Component item={item}/>
        </CellClass>
    );

    // map(f)就是一层递归，也就是对Array里的每个元素使用f函数
    // map(map(f))就是两层递归
    const Assembly = R.compose( // compose的作用就是把下边的函数串联起来
        table, // 打包一个table
        idxMp(column), // 打包n个列
        R.map(idxMp(cell)), // 打包n*m个Item，这两层map可以优化成map(compose(a,b))
        R.map(R.map(getItem)) // 根据index查出对应的对象
    );

    // 输入itemIndexMatrix是一个n*m维的矩阵，每个元素都是index
    return (
        <>
            {Assembly(this.state.itemIndexMatrix)}
        </>
    );
};

class CellClass extends React.Component {
    constructor(props) {
        super(props);
        this.style = {
            padding: HALF_GAP + 'rem',
            margin: '0',
            border: '0',
        }
    }

    componentDidMount() {
        const height = this.divEl.clientHeight;
        this.props.setHeight(height);
    }

    render() {
        return (
            <div style={this.style} ref={el => this.divEl = el}>
                {this.props.children}
            </div>
        )
    }

}
// table不能定义margin，会跟body margin collapse，导致判断是否滚动到底错误
this.columnStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: COLUMN_WIDTH + 'rem',
};
export default MasonryLayout;
