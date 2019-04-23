import React, {useState, useEffect, useContext, useRef} from 'react';
import PropTypes from "prop-types";
import {ContextFs, ContextWiw} from "./GlobalState";
import MasonryLayout from "./MasonryLayout";

const MIN_COLUMN_NO = 2; // 最少这么多列
const COLUMN_WIDTH = 20; // rem
const HALF_GAP = 0.8; // rem
let prevColumnNo = 0; // 窗口宽度改变的时候，需要拿之前的列数和现在的列数比较

class ColumnNoObj {
    constructor(columnNo) {
        this.itemIndexMatrix = [...Array(columnNo)].map(() => []); // 二维数组，存的是每列包含的那部分xs的indexInAllXs
        this.columnHeights = Array(columnNo).fill(0); // 一维数组，每列的高度。
        this.lastCellsItemIndex = -1;
    }
}

class FactorObj {
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

class Layouts {
    getFo(fs) {
        if (this[fs] === undefined) {
            this[fs] = new FactorObj();
        }
        return this[fs];
    }
}

// let layouts = {
//     COLUMN_WIDTH: 20, // rem
//     MIN_COLUMN_NO: 2, // 最少这么多列
//     HALF_GAP: 0.8, // rem
//
//     '16px': { // FactorObj
//         cellHeights: [],
//         2: { // ColumnNoObj
//             itemIndexMatrix: [[], []],
//             columnHeights: [0, 0],
//             lastCellsItemIndex: -1,
//         },
//         3: {}, // ColumnNoObj
//     },
//
//     '18px': {},
// };
let layouts = new Layouts();

const calculateColumnNo = (wiw) => {
    let htmlFontSize = parseInt(getComputedStyle(document.documentElement).fontSize);
    let completeColumnNo = Math.floor((wiw - 2 * HALF_GAP * htmlFontSize)
        / (COLUMN_WIDTH * htmlFontSize));
    // 最小也得是2列，不能返回0列
    return Math.max(MIN_COLUMN_NO, completeColumnNo);
};

const getFoCno = (fs, wiw) => {
    layouts.getFo(fs).getCno(calculateColumnNo(wiw));
};

const getShortestColumnIndex = (fs, wiw) => {
    return getFoCno(fs, wiw).columnHeights.indexOf(
        Math.min(...getFoCno(fs, wiw).columnHeights));
};

const setHeight = (fs, wiw, height) => {
    layouts.getFo(fs).cellHeights.push(height);
    getFoCno(fs, wiw).columnHeights[getShortestColumnIndex(fs, wiw)] += height;
};

const CellArrangement = ({items}) => {
    const fs = useContext(ContextFs); // Factor string, i.e Font size
    const wiw = useContext(ContextWiw); // Window inner width

    const getItem = useRef(i => {
        return items[i];
    });

    const [matrix, setMatrix] = useState();

    if (getFoCno(fs, wiw).lastCellsItemIndex + 1 < items.length) {
        for lastCellsItemIndex: cellHeights.length
        setMatrix(()=>getFoCno(fs, wiw).itemIndexMatrix);
        for cellHeights.length: items.length
        setMatrix(()=>getFoCno(fs, wiw).itemIndexMatrix);
    }
    getFoCno(fs, wiw).lastCellsItemIndex = this.items.push(item) - 1;
    // itemIndexMatrix能改，我觉得是因为是shadow freeze的，这个得再试试。另外react应该不推荐这个写法。
    this.layout.itemIndexMatrix[this.shortestColumnIndex].push(this.layout.lastCellsItemIndex);
    this.setState(prevState => prevState);

    return (
        <MasonryLayout matrix={matrix} getItem={getItem} setHight={setHeight}/>
    )
};

CellArrangement.propTypes = {
    items: PropTypes.array.isRequired,
};
