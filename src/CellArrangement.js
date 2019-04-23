import React, {useState} from 'react';
import PropTypes from "prop-types";
import {ContextFs, ContextWiw} from "./GlobalState";
import * as R from "ramda";
import MasonryLayout from "./MasonryLayout";

const idxMp = R.addIndex(R.map);
const MIN_COLUMN_NO = 2; // 最少这么多列
const COLUMN_WIDTH = 20; // rem
const HALF_GAP = 0.8; // rem
let prevColumnNo = 0; // 窗口宽度改变的时候，需要拿之前的列数和现在的列数比较

class ColumnNoObj {
    constructor(columnNo) {
        this.itemIndexMatrix = [...Array(columnNo)].map(() => []); // 二维数组，存的是每列包含的那部分xs的indexInAllXs
        this.columnHeights = Array(columnNo).fill(0); // 一维数组，每列的高度。
        this.lastCellItemIndex = -1;
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

let layouts = new Layouts();
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

const CellArrangement = ({items}) => {
    const fs = React.useContext(ContextFs); // Factor string, i.e Font size
    const wiw = React.useContext(ContextWiw); // Window inner width

    const getColumnNo = () => {
        let htmlFontSize = parseInt(getComputedStyle(document.documentElement).fontSize);
        let completeColumnNo = Math.floor((wiw - 2 * HALF_GAP * htmlFontSize)
            / (COLUMN_WIDTH * htmlFontSize));
        // 最小也得是2列，不能返回0列
        return Math.max(MIN_COLUMN_NO, completeColumnNo);
    };

    const getLayout = () => {
        layouts.getFo(fs).getCno(getColumnNo(wiw));
    };

    const getShortestColumnIndex = () => {
        return getLayout(fs, wiw).columnHeights.indexOf(
            Math.min(...getLayout(fs, wiw).columnHeights));
    };

    const setHeight = (height) => {
        layouts.getFo(fs).cellHeights.push(height);
        getLayout().columnHeights[getShortestColumnIndex()] += height;
    };

    const setCell = item => {
        this.layout.lastCellItemIndex = this.items.push(item) - 1;
        // itemIndexMatrix能改，我觉得是因为是shadow freeze的，这个得再试试。另外react应该不推荐这个写法。
        this.layout.itemIndexMatrix[this.shortestColumnIndex].push(this.layout.lastCellItemIndex);
        this.setState(prevState => prevState);
    };

    const getCell = (i) => {
        return this.items[i];
    };

    return (
        <MasonryLayout matrix={}/>
    )
};

CellArrangement.propTypes = {
    items: PropTypes.array.isRequired,
};
