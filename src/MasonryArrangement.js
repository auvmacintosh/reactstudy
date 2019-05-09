import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from "prop-types";
import MasonryDS from "./MasonryDS";
import Table from "./MasonryLayout";

const MIN_COLUMN_NO = 1; // 最少这么多列
export const HALF_GAP = 1; // rem
// 正在更新的item的index，只有判断自己是这个item的时候，才会更新height和offsetBottom
// 放在Component外边，而不是放在state里的原因是，这个值不涉及render，
// 如果放到state里还需要用memo之类的躲开，比较麻烦
export let itemIndexUnderUpdating = -1;
export const setItemIndexUnderUpdating = (i) => {
    itemIndexUnderUpdating = i;
};
let ds = new MasonryDS();
// 当宽度小到一定程度，判断为手机用户，尽量占满屏幕
const getColumnWidth = (fs, wiw) => {
    const defaultColumnWidth = 20;
    // todo: 这个算法是对的,但是现在还不能返回不同的列宽,因为下边的bug
    // 58rem大概是900px。小于这个值，列数不变，但是把空白位置占满。
    // if (wiw / fs < 58) {
    //     const completeColumnNo = Math.floor((wiw - 2 * HALF_GAP * fs)
    //         / (defaultColumnWidth * fs));
    //     const defaultColumnNo = Math.max(MIN_COLUMN_NO, completeColumnNo);
    //     return (wiw / fs - 2 * HALF_GAP) / defaultColumnNo;
    // } else {
    //     return defaultColumnWidth; // rem
    // }
    return defaultColumnWidth;
};
const getColumnNo = (fs, wiw) => {
    let completeColumnNo = Math.floor((wiw - 2 * HALF_GAP * fs)
        / (getColumnWidth(fs, wiw) * fs));
    // 最小也得是1列，不能返回0列
    return Math.max(MIN_COLUMN_NO, completeColumnNo);
};

const MasonryArrangement = ({items, fs, wiw}) => {
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
        // todo: 这段对应cnds改了但cwds没变的情况，如果cwds都改了，需要一个一个渲染过来。
        // console.debug('cnds changed, should set matrix');
        // 如果没有新数据，但是当前cnds.itemIndexMatrix上缺一些items，就把这些items都补上
        // console.debug(lci +'  '+ chl);
        if (lci + 1 < chl) {
            // console.debug('this cnds.itemIndexMatrix need to append some old items')
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
            // console.debug('il changed, should concat the new item ' + (il - 1));
            setItemIndexUnderUpdating(il - 1);
            cnds.concatItemIndex(il - 1);
            // console.debug(cnds.itemIndexMatrix)
            // console.debug(cnds.offsetBottomMatrix)
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

MasonryArrangement.propTypes = {
    items: PropTypes.array.isRequired,
};

export default MasonryArrangement;
