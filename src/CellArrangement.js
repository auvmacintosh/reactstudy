import React, {useState, useContext, useRef, useCallback} from 'react';
import PropTypes from "prop-types";
import {ContextFs, ContextWiw} from "./GlobalState";
import CellArrangementDS from "./CellArrangementDS";
import MasonryLayout from "./MasonryLayout";

const MIN_COLUMN_NO = 1; // 最少这么多列
const HALF_GAP = 0.8; // rem
// todo: 当宽度小到一定程度，判断为手机用户，列宽占满屏幕
const getColumnWidth = (wiw) => {
    return 20; // rem
};
const getColumnNo = (fs, wiw) => {
    let completeColumnNo = Math.floor((wiw - 2 * HALF_GAP * fs)
        / (getColumnWidth(wiw) * fs));
    // 最小也得是2列，不能返回0列
    return Math.max(MIN_COLUMN_NO, completeColumnNo);
};

let ds = new CellArrangementDS();
let prevColumnNo = 0; // 窗口宽度改变的时候，需要拿之前的列数和现在的列数比较

const CellArrangement = ({items}) => {
    const fs = useContext(ContextFs); // Font size
    const wiw = useContext(ContextWiw); // Window inner width
    const getCwds = () => ds.getCwds(getColumnWidth(wiw));
    const getCnds = () => ds.getCwds(getColumnWidth(wiw)).getCnds(getColumnNo(fs, wiw));
    const [matrix, setMatrix] = useState();
    const getItem = useRef(i => items[i]);
    const pushCellHeight = useCallback(getCwds().pushCellHeight, [wiw]);
    const pushOffsetBottom = useCallback(getCnds().pushOffsetBottom, [fs, wiw])

    // todo: 把一次items的改变拆成一个一个render
    setTimeout(()=>{

    },0);
    if (getCnds().getLastCellsItemIndex() + 1 < items.length) {
        for lastCellsItemIndex:
        cellHeights.length
        setMatrix(() => getFoCno(fs, wiw).itemIndexMatrix);
        for cellHeights.length:
        items.length
        setMatrix(() => getFoCno(fs, wiw).itemIndexMatrix);
    }
    getFoCno(fs, wiw).lastCellsItemIndex = this.items.push(item) - 1;
    // itemIndexMatrix能改，我觉得是因为是shadow freeze的，这个得再试试。另外react应该不推荐这个写法。
    this.layout.itemIndexMatrix[this.shortestColumnIndex].push(this.layout.lastCellsItemIndex);
    this.setState(prevState => prevState);

    return (
        <MasonryLayout matrix={matrix} getItem={getItem}
                       pushCellHeight={pushCellHeight}
                       pushOffsetBottom={pushOffsetBottom}
        />
    )
};

CellArrangement.propTypes = {
    items: PropTypes.array.isRequired,
};
