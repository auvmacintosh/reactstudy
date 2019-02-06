import React from 'react';
import PropTypes from "prop-types";
import * as R from "ramda";

const COLUMN_WIDTH = 20; // rem
const HALF_GAP = 0.8; // rem
const PAGE_SIZE = 10; // 每次拉到底的page size，本来想第一次刷新多一些，后拉发现page no不好算

const idxMp = R.addIndex(R.map);

const withMasonryLayout = Component => {
    class ComponentWithMasonryLayout extends React.Component {
        constructor(props) {
            super(props);
            this.htmlFontSize = window.getComputedStyle(document.documentElement)
                .fontSize.slice(0, -2); // normally is 16
            this.items = []; // 一维数组，记录的是所有的items
            this.itemHeights = [];
            this.page = 0; // getXs的页号

            // 最好是固定滚动条,不然计算宽高可能会有错误
            // document.body.style.overflowX = 'hidden';
            // document.body.style.overflowY = 'scroll';

            // table不能定义margin，会跟body margin collapse，导致判断是否滚动到底错误
            this.tableStyle = {
                display: 'flex',
                justifyContent: 'center',
                padding: HALF_GAP + 'rem',
                minWidth: (COLUMN_WIDTH * this.columnNo) + 'rem',
            };
            this.columnStyle = {
                display: 'flex',
                flexDirection: 'column',
                width: COLUMN_WIDTH + 'rem',
            };

            this.layouts = {};
            this.layouts[this.columnNo] = {
                itemIndexMatrix: [...Array(this.columnNo)].map(() => []), // 二维数组，存的是每列包含的那部分xs的indexInAllXs
                columnHeights: Array(this.columnNo).fill(0), // 一维数组，每列的高度。
                lastItemIndex: -1,
            };

            this.state = {
                itemIndexMatrix: this.layouts[this.columnNo].itemIndexMatrix
            };
        }

        get columnNo() {
            let completeColumnNo = Math.floor((window.innerWidth - 2 * HALF_GAP * this.htmlFontSize)
                / (COLUMN_WIDTH * this.htmlFontSize));
            // 最小也得是一列，不能返回0列
            // return completeColumnNo === 0 ? 1 : completeColumnNo;
            return 3;
        }

        get layout() {
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
            this.layout.itemIndexMatrix[this.shortestColumnIndex].push(this.items.push(item) - 1);
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
                window.removeEventListener('scroll', this.handleWindowEvent)
                // this.props.getXs(this.page++, PAGE_SIZE).then(response => {
                this.props.getXs(0, PAGE_SIZE).then(response => {
                    response.xs.forEach((x) => {
                        this.addItem(x);
                    });
                    // 相同事件，相同callback的多次addEventListener只会被加一次
                    window.addEventListener('scroll', this.handleWindowEvent)
                    this.getXsWhenReachBottom();
                });
            }
        }

        componentDidMount() {
            this.getXsWhenReachBottom();
            ['resize', 'scroll'].forEach(e => window.addEventListener(e, this.handleWindowEvent));
        }

        componentWillUnmount() {
            ['resize', 'scroll'].forEach(e => window.removeEventListener(e, this.handleWindowEvent));
        }

        handleWindowEvent = (e) => {
            switch (e.type) {
                case "scroll":
                    this.getXsWhenReachBottom();
                    break;
                case "resize":
                    // TODO: 完成resize
                    console.log('resize');
                    break;
                default:
                    console.log("no such event.");
            }
        };

        Table = columns => (
            <div style={this.tableStyle}>
                {columns}
            </div>
        );

        Column = (items, i) => (
            <div key={i} style={this.columnStyle}>
                {items}
            </div>
        );

        Item = (item, i) => (
            <ItemClass key={i} setHeight={this.setHeight}>
                <Component item={item}/>
            </ItemClass>
        );

        // map(f)就是一层递归，也就是对Array里的每个元素使用f函数
        // map(map(f))就是两层递归
        Assembly = R.compose( // compose的作用就是把下边的函数串联起来
            this.Table, // 打包一个table
            idxMp(this.Column), // 打包n个列
            R.map(idxMp(this.Item)), // 打包n*m个Item
            R.map(R.map(this.getItem)) // 根据index查出对应的对象
        );

        // 输入是一个n*m维的矩阵，每个元素都是index

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
