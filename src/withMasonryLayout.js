import React from 'react';
import PropTypes from "prop-types";
import * as R from "ramda";

const COLUMN_WIDTH = 20; // rem
const MIN_COLUMN_NO = 2; // 最少这么多列
const HALF_GAP = 0.8; // rem
const PAGE_SIZE = 10; // 每次拉到底的page size，本来想第一次刷新多一些，后拉发现page no不好算
const RESIZE_DONE_TIMEOUT = 1000; // 这么多ms没有resize以后才会开始重新布局

const idxMp = R.addIndex(R.map);

const withMasonryLayout = Component => {
    class ComponentWithMasonryLayout extends React.Component {
        constructor(props) {
            super(props);
            this.items = []; // 一维数组，记录的是所有的items
            this.itemHeights = [];
            this.layouts = {};
            this.nextPage = 0; // getXs的页号
            this.prevColumnNo = 0;
            this.resizeDone = -1;

            // table不能定义margin，会跟body margin collapse，导致判断是否滚动到底错误
            this.columnStyle = {
                display: 'flex',
                flexDirection: 'column',
                width: COLUMN_WIDTH + 'rem',
            };

            this.state = {
                itemIndexMatrix: this.layout.itemIndexMatrix,
                tableStyle: {
                    display: 'flex',
                    justifyContent: 'center',
                    padding: HALF_GAP + 'rem',
                    minWidth: (COLUMN_WIDTH * this.columnNo) + 'rem',
                }
            };
        }

        get columnNo() {
            let htmlFontSize = window.getComputedStyle(document.documentElement)
                .fontSize.slice(0, -2);
            let completeColumnNo = Math.floor((window.innerWidth - 2 * HALF_GAP * htmlFontSize)
                / (COLUMN_WIDTH * htmlFontSize));
            // 最小也得是一列，不能返回0列
            return Math.max(MIN_COLUMN_NO, completeColumnNo);
        }

        get layout() {
            if (this.layouts[this.columnNo] === undefined) {
                this.layouts[this.columnNo] = {
                    itemIndexMatrix: [...Array(this.columnNo)].map(() => []), // 二维数组，存的是每列包含的那部分xs的indexInAllXs
                    columnHeights: Array(this.columnNo).fill(0), // 一维数组，每列的高度。
                    lastItemIndex: -1,
                };
            }
            return this.layouts[this.columnNo];
        }

        get shortestColumnIndex() {
            return this.layout.columnHeights.indexOf(
                Math.min(...this.layout.columnHeights));
        }

        setHeight = height => {
            this.itemHeights.push(height);
            this.layout.columnHeights[this.shortestColumnIndex] += height;
        };

        addItem = item => {
            this.layout.lastItemIndex = this.items.push(item) - 1;
            // itemIndexMatrix能改，我觉得是因为是shadow freeze的，这个得再试试。另外react应该不推荐这个写法。
            this.layout.itemIndexMatrix[this.shortestColumnIndex].push(this.layout.lastItemIndex);
            this.setState(prevState => prevState);
        };

        getItem = i => this.items[i];

        // Asynchronous Recursive
        getXsWhenReachBottom = () => {
            // 需要用>=判断，如果用===判断，有滚动条的时候，就不会触发。
            // 但是用>=有一个问题就是会连续触发，这时候需要先removeEventListener再add上去
            // +2的原因是，缩放以后，这三个值会四舍五入，比如应该是0.3+0.3>=0.6，四舍五入以后变成0+0!>=1
            if ((window.innerHeight + window.scrollY + 2) >= document.body.clientHeight) {
                // remove不存在的eventListener不会报错
                window.removeEventListener('scroll', this.handleWindowEvent);
                this.props.getXs(this.nextPage++, PAGE_SIZE).then(response => {
                    // this.props.getXs(0, PAGE_SIZE).then(response => {
                    response.xs.forEach((x) => {
                        this.addItem(x);
                    });
                    // 相同事件，相同callback的多次addEventListener只会被加一次
                    window.addEventListener('scroll', this.handleWindowEvent);
                    this.getXsWhenReachBottom();
                });
            }
        };

        componentDidMount() {
            if (this.items.length === 0) {
                this.getXsWhenReachBottom();
            ['resize', 'scroll'].forEach(e => window.addEventListener(e, this.handleWindowEvent));
            }
            this.prevColumnNo = this.columnNo;
        }

        componentWillUnmount() {
            ['resize', 'scroll'].forEach(e => window.removeEventListener(e, this.handleWindowEvent));
        }

        handleWindowEvent = (e) => {
            e.preventDefault();
            switch (e.type) {
                case "scroll":
                    this.getXsWhenReachBottom();
                    break;
                case "resize":
                    clearTimeout(this.resizeDone);
                    // RESIZE_DONE_TIMEOUT(例如100)ms没有resize以后再重新布局；
                    this.resizeDone = setTimeout(this.renderOnResizeDone, RESIZE_DONE_TIMEOUT);
                    break;
                default:
                    console.log("no such event.");
            }
        };

        renderOnResizeDone = () => {
            if (this.columnNo !== this.prevColumnNo) {
                // console.log('1: '+ this.columnNo);
                if (this.layout.lastItemIndex + 1 < this.items.length) {
                    // console.log('2:' + this.layout.lastItemIndex +' '+ this.items.length);
                    for (let i = this.layout.lastItemIndex + 1; i < this.items.length; i++) {
                        // console.log('3');
                        let shortestColumnIndex = this.shortestColumnIndex;
                        this.layout.itemIndexMatrix[shortestColumnIndex].push(i);
                        this.layout.columnHeights[shortestColumnIndex] += this.itemHeights[i];
                        this.layout.lastItemIndex = i;
                        console.log(`${i}: ${(this.layout.columnHeights)}`)
                    }
                }
                let a = this.layout.columnHeights;
                this.setState(() => ({
                    itemIndexMatrix: this.layout.itemIndexMatrix,
                    tableStyle: {
                        display: 'flex',
                        justifyContent: 'center',
                        padding: HALF_GAP + 'rem',
                        minWidth: (COLUMN_WIDTH * this.columnNo) + 'rem',
                    }
                }));
                this.layout.columnHeights=a;
                // this.getXsWhenReachBottom();
                this.prevColumnNo = this.columnNo;
            }
        };

        table = columns => (
            <div style={this.state.tableStyle}>
                {columns}
            </div>
        );

        column = (items, i) => (
            <div key={i} style={this.columnStyle}>
                {items}
            </div>
        );

        item = (item, i) => (
            <ItemClass key={i} setHeight={this.setHeight}>
                <Component item={item}/>
            </ItemClass>
        );

        // map(f)就是一层递归，也就是对Array里的每个元素使用f函数
        // map(map(f))就是两层递归
        Assembly = R.compose( // compose的作用就是把下边的函数串联起来
            this.table, // 打包一个table
            idxMp(this.column), // 打包n个列
            R.map(idxMp(this.item)), // 打包n*m个Item，这两层map可以优化成map(compose(a,b))
            R.map(R.map(this.getItem)) // 根据index查出对应的对象
        );

        // 输入itemIndexMatrix是一个n*m维的矩阵，每个元素都是index
        render() {
            return (
                <>
                    {this.Assembly(this.state.itemIndexMatrix)}
                </>
            )
        }
    }

    ComponentWithMasonryLayout.propTypes = {
        getXs: PropTypes.func.isRequired,
    };

    return ComponentWithMasonryLayout;
};

class ItemClass extends React.Component {
    constructor(props) {
        super(props);
        this.style = {
            padding: HALF_GAP + 'rem',
            margin: '0',
            border: '0',
        }
    }

    componentDidMount() {
        const height = this.divEl.clientHeight;
        this.props.setHeight(height);
    }

    render() {
        return (
            <div style={this.style} ref={el => this.divEl = el}>
                {this.props.children}
            </div>
        )
    }
}

ItemClass.propTypes = {
    setHeight: PropTypes.func.isRequired,
};

export default withMasonryLayout;
