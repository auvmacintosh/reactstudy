import React, {useState, useContext, useRef, useCallback} from 'react';
import PropTypes from "prop-types";
import CellArrangementDS from "./CellArrangementDS";
import MasonryLayout from "./MasonryLayout";

const MIN_COLUMN_NO = 1; // 最少这么多列
export const HALF_GAP = 0.8; // rem
// todo: 当宽度小到一定程度，判断为手机用户，列宽占满屏幕
const getColumnWidth = (fs, wiw) => {
    return 15; // rem
};
const getColumnNo = (fs, wiw) => {
    let completeColumnNo = Math.floor((wiw - 2 * HALF_GAP * fs)
        / (getColumnWidth(wiw) * fs));
    // 最小也得是2列，不能返回0列
    return Math.max(MIN_COLUMN_NO, completeColumnNo);
};

let ds = new CellArrangementDS();
let prevColumnWidth = 0; // 窗口宽度改变的时候，需要拿之前的列宽和现在的列宽比较
let prevColumnNo = 0; // 窗口宽度改变的时候，需要拿之前的列数和现在的列数比较

const CellArrangement = ({items, fs, wiw}) => {
    const columnWidth = getColumnWidth(fs, wiw);
    const columnNo = getColumnNo(fs, wiw);
    const cwds = ds.getCwds(columnWidth);
    const cnds = ds.getCwds(columnWidth).getCnds(columnNo);
    // 最主要的输出值，layout矩阵，后边的MasonryLayout就是根据这个布局的
    const [matrix, setMatrix] = useState([]);
    // 正在更新的item的index，只有判断自己是这个item的时候，才会更新height和offsetBottom
    const [itemIndexUnderUpdating, setItemIndexUnderUpdating] = useState(-1);
    const getItem = itemIndex => ({item: items[itemIndex], itemIndex: itemIndex}); //useRef 报错
    const pushCellHeight = useCallback(cwds.pushCellHeight, [fs, wiw]);
    const pushOffsetBottom = useCallback(cnds.pushOffsetBottom, [fs, wiw]);

    // let cellArrangementDS = {
    //     20: { // ColumnWidthDS
    //         2: { // ColumnNoDS
    //             itemIndexMatrix: [[], []],
    //             offsetBottomMatrix: [[], []],
    //         },
    //         3: {}, // ColumnNoDS
    //         cellHeights: [],
    //         getCnds: (cn) => {
    //         }
    //     },
    //     30: {},
    //
    //     getCwds: (wiw) => {
    //     },
    // };
    let lci = cnds.getLastCellsItemIndex();
    let chl = cwds.cellHeights.length;
    // 如果列宽或者列数改变了，就切换matrix
    if (prevColumnWidth !== columnWidth || prevColumnNo !== columnNo) {
        console.log('1')
        prevColumnWidth = columnWidth;
        prevColumnNo = columnNo;
        setMatrix(() => cnds.itemIndexMatrix);
        console.log(matrix);
    }
    // 如果没有新数据，但是当前matrix缺一些items，就把这些items都补上
    if (lci + 1 < chl) {
        console.log('2')
        // console.log(cnds.itemIndexMatrix);
        for (let i = lci + 1; i < chl; i++) { // 列数改变了
            cnds.concatItemIndex(i);
            cnds.pushOffsetBottom(cnds.getShortestColumnHeight() + cwds.cellHeights[i])
        }
        setMatrix(() => cnds.itemIndexMatrix);
    }
    // 如果有一个新数据，只能有一个，如果多个就说明infiniteList这里有错误了。
    if (chl < items.length) {
        console.log('3')
        setItemIndexUnderUpdating(() => chl);
        // console.log(cnds.itemIndexMatrix);
        cnds.concatItemIndex(chl);
        console.log('iiuu' + itemIndexUnderUpdating)
        console.log('chl' + chl)

        // pushCellHeight(36);
        // pushOffsetBottom((Math.floor(chl / columnNo) + 1) * 36);
        setMatrix(() => cnds.itemIndexMatrix);
    }

    // return (
    //     <MasonryLayout matrix={matrix} getItem={getItem} columnWidth={columnWidth}
    //                    itemIndexUnderUpdating={itemIndexUnderUpdating}
    //                    setItemIndexUnderUpdating={setItemIndexUnderUpdating}
    //                    pushCellHeight={pushCellHeight}
    //                    pushOffsetBottom={pushOffsetBottom}
    //     />
    // )
    return <div>{console.log(matrix)}</div>
};

CellArrangement.propTypes = {
    items: PropTypes.array.isRequired,
};

export default CellArrangement;
