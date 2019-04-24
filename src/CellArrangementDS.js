import binarySearch from "./utility/binarySearch";

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
        // 二维数组，存的是每列包含的那部分xs的offsetBottom，这块存bottom而不是top的原因是，上一个的bottom就是下一个的top，
        // 如果存的是top，只能从cwds里取cellHeight再相加，太麻烦。
        // 这两个二维数组分开存放，而不是一个数组，每个元素是一个object的原因是，
        // 只有itemIndexMatrix传给children了，而offsetBottomMatrix不需要传下去。
        this.offsetBottomMatrix = [...Array(columnNo)].map(() => []);
    }

    getShortestColumnIndex() {
        let columnNo = this.offsetBottomMatrix.length;
        let columnHeights = Array(columnNo).fill().map((el, idx) => {
            return this.offsetBottomMatrix[idx].tail();
        });
        return columnHeights.indexOf(
            Math.min(...columnHeights));
    };

    getLastCellsItemIndex() {
        let columnNo = this.itemIndexMatrix.length;
        let lastCellsItemIndices = Array(columnNo).fill().map((el, idx) => {
            return this.itemIndexMatrix[idx].tail();
        });
        return Math.max(...lastCellsItemIndices);
    };

    getSmallestItemIndexInViewport(scrollHeight) {
        const binarySearchSpecial = (arr, target) => { // binary search default larger变种
            let left = 0;
            let right = arr.length - 1;
            while (left <= right) {
                const mid = left + Math.floor((right - left) / 2);
                if (arr[mid] === target) {
                    return mid + 1; // return mid+1 rather than mid
                }
                if (arr[mid] < target) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
            return left;
        };

        let topItemIndicesInViewport = this.offsetBottomMatrix
            .map((offsetBottomArray) => binarySearchSpecial(offsetBottomArray, scrollHeight))
            .map((el, idx) => this.itemIndexMatrix[idx][el]);

        return Math.min(...topItemIndicesInViewport);
    };

    getCellsOffsetTop(itemIndex) {
        let [x, y] = this.itemIndexMatrix
            .map(itemIndexArray => binarySearch(itemIndexArray, itemIndex))
            .map((el, idx) => {
                if (el !== -1) {
                    return [idx, el]
                }
            });
        return this.offsetBottomMatrix[x][y-1];
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
