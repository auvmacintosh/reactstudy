import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from "prop-types";
import CellArrangementDS from "./CellArrangementDS";
import Table from "./MasonryLayout";

const MIN_COLUMN_NO = 1; // 最少这么多列
export const HALF_GAP = 0.8; // rem
// 正在更新的item的index，只有判断自己是这个item的时候，才会更新height和offsetBottom
export let itemIndexUnderUpdating = -1;
export const setItemIndexUnderUpdating = (i) => {
    itemIndexUnderUpdating = i;
};
let ds = new CellArrangementDS();
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

const CellArrangement = ({items, fs, wiw}) => {
    const columnWidth = getColumnWidth(fs, wiw);
    const columnNo = getColumnNo(fs, wiw);
    const cwds = ds.getCwds(columnWidth);
    const cnds = ds.getCwds(columnWidth).getCnds(columnNo);
    // 最主要的输出值，layout矩阵，后边的MasonryLayout就是根据这个布局的
    const [matrix, setMatrix] = useState(cnds.itemIndexMatrix);

    const getItem = useCallback(itemIndex => items[itemIndex], [items]); //useRef 报错
    const concatCellHeight = useCallback(cwds.concatCellHeight, [cwds]);
    const concatOffsetBottom = useCallback(cnds.concatOffsetBottom, [cnds]);

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
    let il = items.length;

    // 如果列宽或者列数改变了，就切换matrix
    useEffect(() => {
        console.debug('cnds changed, should set matrix');
        // 如果没有新数据，但是当前cnds.itemIndexMatrix上缺一些items，就把这些items都补上
        if (lci + 1 < chl) {
            console.debug('this cnds.itemIndexMatrix need to append some old items')
            for (let i = lci + 1; i < chl; i++) {
                cnds.concatItemIndex(i);
                cnds.concatOffsetBottom(cnds.getShortestColumnHeight() + cwds.cellHeights[i])
            }
        }
        setMatrix(cnds.itemIndexMatrix);
    }, [cnds]);

    // 如果有一个新数据，只能有一个，如果多个就说明infiniteList这里有错误了。
    useEffect(() => {
        if (il > 0) {
            console.debug('il changed, should concat the new item ' + (il - 1));
            setItemIndexUnderUpdating(il - 1);
            cnds.concatItemIndex(il - 1);
            // concatCellHeight(36);
            // concatOffsetBottom((Math.floor(chl / columnNo) + 1) * 36);
            console.debug(cnds.itemIndexMatrix)
            console.debug(cnds.offsetBottomMatrix)
        }
        setMatrix(cnds.itemIndexMatrix);
    }, [il]);

    return (
        <Table matrix={matrix} columnWidth={columnWidth}
                       getItem={getItem}
                       concatCellHeight={concatCellHeight}
                       concatOffsetBottom={concatOffsetBottom}
        />
    )
    // return <div>hello</div>
};

CellArrangement.propTypes = {
    items: PropTypes.array.isRequired,
};

export default CellArrangement;
