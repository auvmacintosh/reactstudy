import React, {useState} from 'react';
import PropTypes from "prop-types";
import {ContextFs, ContextWiw} from "./GlobalState";

const MasonryLayout = ({items}) => {
    const lfs = React.useContext(ContextFs); // Layout factor string, i.e Font sise
    const wiw = React.useContext(ContextWiw); // Window inner width

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
            {items.map((item, i) => <div key={i}>{item._links.self.href.split('/').tail() + item.title}</div>)}
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
    width: COLUMN_WIDTH + 'rem',
};

export default MasonryLayout;
