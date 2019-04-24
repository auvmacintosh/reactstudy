export const MIN_COLUMN_NO = 1; // 最少这么多列
export const HALF_GAP = 0.8; // rem

// todo: 当宽度小到一定程度，判断为手机用户，列宽占满屏幕
export const getColumnWidth = (wiw) => {
    return 20; // rem
};

export const getColumnNo = (fs, wiw) => {
    let completeColumnNo = Math.floor((wiw - 2 * HALF_GAP * fs)
        / (getColumnWidth(wiw) * fs));
    // 最小也得是2列，不能返回0列
    return Math.max(MIN_COLUMN_NO, completeColumnNo);
};

class CellArrangementDS {
    getCwds(wiw) {
        let columnWidth = getColumnWidth(wiw);
        if (this[columnWidth] === undefined) {
            this[columnWidth] = new ColumnWidthDS();
        }
        return this[columnWidth];
    }
}

class ColumnWidthDS {
    constructor() {
        this.cellHeights = [];
    }

    getCnds(columnNo) {
        if (this[columnNo] === undefined) {
            this[columnNo] = new ColumnNoDS(columnNo);
        }
        return this[columnNo];
    }
}

class ColumnNoDS {
    constructor(columnNo) {
        // 二维数组，存的是每列包含的那部分xs的indexInAllXs
        this.itemIndexMatrix = [...Array(columnNo)].map(() => []);
        // 二维数组，存的是每列包含的那部分xs的offsetBottom
        this.offsetBottomMatrix = [...Array(columnNo)].map(() => []);
    }

    getShortestColumnIndex() {
        let columnNo = this.offsetBottomMatrix.length;
        let columnHeights = Array(columnNo).fill().map((el, idx)=>{
            return this.offsetBottomMatrix[idx].tail();
        });
        return columnHeights.indexOf(
            Math.min(...columnHeights));
    };

    getLastCellsItemIndex() {
        let columnNo = this.itemIndexMatrix.length;
        let lastCellsItemIndices = Array(columnNo).fill().map((el, idx)=>{
            return this.itemIndexMatrix[idx].tail();
        });
        return Math.max(...lastCellsItemIndices);
    };

    getSmallestItemIndexInViewport(scrollHight) {
    };

    getCellsOffsetTop(itemIndex) {
    };

    setOffsetBottom(fs, wiw, height) {
        // this.getCwds(fs).cellHeights.push(height);
        this.getCwdsCnds(fs, wiw).columnHeights[this.getShortestColumnIndex(fs, wiw)] += height;
    };
}

export default CellArrangementDS;

// let cellArrangementDS = {
//     20: { // ColumnWidthDS
//         cellHeights: [],
//         2: { // ColumnNoDS
//             itemIndexMatrix: [[], []],
//             offsetBottomMatrix: [[], []],
//         },
//         3: {}, // ColumnNoDS
//         getCnds: (cn)=>{}
//     },
//     30 : {},
//
//     getCwds: (wiw)=>{},
// };
