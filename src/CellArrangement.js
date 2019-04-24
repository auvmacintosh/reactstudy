import React, {useState, useEffect, useContext, useRef} from 'react';
import PropTypes from "prop-types";
import {ContextFs, ContextWiw} from "./GlobalState";
import MasonryLayout from "./MasonryLayout";

let layouts = new CellArrangementDS();

let prevColumnNo = 0; // 窗口宽度改变的时候，需要拿之前的列数和现在的列数比较


const CellArrangement = ({items}) => {
    const fs = useContext(ContextFs); // Font size
    const wiw = useContext(ContextWiw); // Window inner width

    const getItem = useRef(i => {
        return items[i];
    });

    const [matrix, setMatrix] = useState();

    if (getFoCno(fs, wiw).lastCellsItemIndex + 1 < items.length) {
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
        <MasonryLayout matrix={matrix} getItem={getItem} setHight={setHeight}/>
    )
};

CellArrangement.propTypes = {
    items: PropTypes.array.isRequired,
};
