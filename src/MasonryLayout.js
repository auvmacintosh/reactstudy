import React, {useState} from 'react';
import PropTypes from "prop-types";

const MasonryLayout = ({matrix, getItem, itemIndexUnderUpdating, pushCellHeight, pushOffsetBottom}) => {

    // const [itemIndexMatrix, setItemIndexMatrix] = useState(layouts[columnNo].itemIndexMatrix);
    // this.state = {
    //     itemIndexMatrix: this.layout.itemIndexMatrix,
    //     tableStyle: {
    //         display: 'flex',
    //         justifyContent: 'center',
    //         padding: HALF_GAP + 'rem',
    //         minWidth: (COLUMN_WIDTH * this.columnNo) + 'rem',
    //     }
    // };

    return (
        <div style={columnStyle}>
            {matrix.map((item, i) => <div key={i}>{item._links.self.href.split('/').tail() + item.title}</div>)}
            <div style={spinnerStyle}></div>
        </div>
    );
};


const spinnerStyle = {
    padding: '10px',
};
// table不能定义margin，会跟body margin collapse，导致判断是否滚动到底错误
const columnStyle = {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '16px',
    // width: COLUMN_WIDTH + 'rem',
    width: '10rem',
};

export default MasonryLayout;
