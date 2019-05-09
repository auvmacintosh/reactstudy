import React, {useRef, useEffect, memo} from 'react';
// import PropTypes from "prop-types";
// MasonryLayout跟CellArrangement的耦合度很高，需要引入参数和方法
import {HALF_GAP, itemIndexUnderUpdating, setItemIndexUnderUpdating} from "./MasonryArrangement";
import Item from "./Item";

const Table = memo(({
                        matrix, columnWidth,
                        getItem,
                        concatCellHeight,
                        concatOffsetBottom
                    }) => {
    // console.log(getItem(0))
    const columnNo = matrix.length;

    // table不能定义margin，会跟body margin collapse，导致判断是否滚动到底错误
    const tableStyle = {
        display: 'flex',
        justifyContent: 'center',
        padding: HALF_GAP + 'rem',
        minWidth: (columnWidth * columnNo) + 'rem',
    };

    return (
        <div style={tableStyle}>
            {matrix.map((column, columnIndex) => {
                return (
                    <Column key={columnIndex}
                            column={column} columnWidth={columnWidth}
                            getItem={getItem}
                            concatCellHeight={concatCellHeight}
                            concatOffsetBottom={concatOffsetBottom}
                    />
                )
            })}
        </div>
    )
}, (prev, next) => {
    return prev.matrix === next.matrix && prev.columnWidth === next.columnWidth
});

const Column = memo(({
                         column, columnWidth,
                         getItem,
                         concatCellHeight,
                         concatOffsetBottom
                     }) => {
    const columnStyle = {
        display: 'flex',
        flexDirection: 'column',
        width: columnWidth + 'rem',
    };

    return (
        <div style={columnStyle}>
            {column.map(itemIndex => {
                return (
                    <Cell key={itemIndex}
                          itemIndex={itemIndex} item={getItem(itemIndex)}
                          concatCellHeight={concatCellHeight}
                          concatOffsetBottom={concatOffsetBottom}
                    />
                )
            })}
        </div>
    )
}, (prev, next) => {
    return prev.column === next.column && prev.columnWidth === next.columnWidth
});

const Cell = memo(({
                       itemIndex, item,
                       concatCellHeight,
                       concatOffsetBottom
                   }) => {
    const cellStyle = {
        padding: HALF_GAP + 'rem',
        margin: '0',
        border: '0',
    };
    const ref = useRef(null);
    // console.debug('render item ' + itemIndex)
    useEffect(() => {
        if (itemIndex === itemIndexUnderUpdating) {
            const cellHeight = ref.current.clientHeight;
            const cellOffsetBottom = ref.current.offsetTop + cellHeight;
            concatCellHeight(cellHeight);
            concatOffsetBottom(cellOffsetBottom);
            setItemIndexUnderUpdating(-1);
        }
    }, []);

    return (
        <div ref={ref} style={cellStyle}>
            <Item item={item}/>
        </div>
    );
}, (prev, next) => {
    return prev.itemIndex === next.itemIndex
});

export default Table;
