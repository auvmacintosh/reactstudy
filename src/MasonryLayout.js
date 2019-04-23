import React, {useState} from 'react';
import PropTypes from "prop-types";
import {ContextFs, ContextWiw} from "./GlobalState";
import * as R from "ramda";

const idxMp = R.addIndex(R.map);

let layouts = {
    COLUMN_WIDTH: 20, // rem
    MIN_COLUMN_NO: 2, // 最少这么多列
    HALF_GAP: 0.8, // rem

    '16px': { // LayoutFactorObj
        cellHeights: [],
        2: { // ColumnNoObj
            itemIndexMatrix: [[], []],
            columnHeights: [0, 0],
            lastCellsItemIndex: -1,
        },
        3: {}, // ColumnNoObj
    },

    lf18px: {},
};

class ColumnNoObj {
    constructor(columnNo) {
        this.itemIndexMatrix = [...Array(columnNo)].map(() => []); // 二维数组，存的是每列包含的那部分xs的indexInAllXs
        this.columnHeights = Array(columnNo).fill(0); // 一维数组，每列的高度。
        this.lastCellItemIndex = -1;
    }
}

class LayoutFactorObj {
    constructor() {
        this.cellHeights = [];
    }

    getCno(columnNo) {
        if (this[columnNo] === undefined) {
            this[columnNo] = new ColumnNoObj(columnNo);
        }
        return this[columnNo];
    }
}

class CellArrangement {
    constructor() {
        this.MIN_COLUMN_NO = 2; // 最少这么多列
        this.COLUMN_WIDTH = 20; // rem
        this.HALF_GAP = 0.8; // rem
    }

    getLfo(lfs) {
        if (this[lfs] === undefined) {
            this[lfs] = new LayoutFactorObj();
        }
        return this[lfs];
    }

    getColumnNo(wiw) {
        let htmlFontSize = parseInt(getComputedStyle(document.documentElement).fontSize);
        let completeColumnNo = Math.floor((wiw - 2 * this.HALF_GAP * htmlFontSize)
            / (this.COLUMN_WIDTH * htmlFontSize));
        // 最小也得是2列，不能返回0列
        return Math.max(this.MIN_COLUMN_NO, completeColumnNo);
    }

    getLayout(lfs, wiw) {
        this.getLfo(lfs).getCno(this.getColumnNo(wiw))
    }

    getShortestColumnIndex(lfs, wiw) {
        return this.getLayout(lfs, wiw).columnHeights.indexOf(
            Math.min(...this.getLayout(lfs, wiw).columnHeights));
    }

    setHeight(lfs, wiw, height) {
        this.getLfo(lfs).cellHeights.push(height);
        this.getLayout(lfs, wiw).columnHeights[this.getShortestColumnIndex(lfs, wiw)] += height;
    };

    setCell = item => {
        this.layout.lastCellItemIndex = this.items.push(item) - 1;
        // itemIndexMatrix能改，我觉得是因为是shadow freeze的，这个得再试试。另外react应该不推荐这个写法。
        this.layout.itemIndexMatrix[this.shortestColumnIndex].push(this.layout.lastCellItemIndex);
        this.setState(prevState => prevState);
    };

    getCell(i){this.items[i]};
}

let prevColumnNo = 0; // 窗口宽度改变的时候，需要拿之前的列数和现在的列数比较

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

MasonryLayout.propTypes = {
    items: PropTypes.array.isRequired,
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
