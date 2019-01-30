import React from 'react';
import PropTypes from "prop-types";
import {compose, map} from "ramda";

// const Item = (Component) => (setHeight) => {
//     class ItemWithComponentAndSetHeight extends React.Component {
//         componentDidMount() {
//             const height = this.divElement.clientHeight;
//             setHeight(height);
//         }
//
//         render() {
//             return (
//                 <div ref={(divElement) => this.divElement = divElement}>
//                     <Component item={this.props.item}/>
//                 </div>
//             )
//         }
//     }
//
//     ItemWithComponentAndSetHeight.propTypes = {
//         item: PropTypes.object,
//     };
//
//     return ItemWithComponentAndSetHeight;
// }

const Item = (Component) => (setHeight) => (item) => {
    return <Component setHeight={setHeight}
                      item={item}
    />
}
const Column = items => (
    <div style={{display: 'flex', flexDirection: 'column', width: '20rem',}}>
        {items}
    </div>
)

const Table = columns => (
    <div style={{display: 'flex', flexDirection: 'row',}}>
        {columns}
    </div>
)

const withMasonryLayout = Component => {
    class ComponentWithMasonryLayout extends React.Component {
        constructor(props) {
            super(props);
            this.columnNo = 3;
            this.items = []; // 一维数组，记录的是所有的items
            this.itemHeights = [];

            this.layouts = {};
            this.layouts[this.columnNo] = {
                columns: [...Array(this.columnNo)].map(() => []), // 二维数组，存的是每列包含的那部分xs的indexInAllXs
                columnHeights: Array(this.columnNo).fill(0), // 一维数组，每列的高度。
                lastItemIndex: -1,
            };

            this.state = {
                columns: this.layouts[this.columnNo].columns
            };
        }

        get layout() {
            return this.layouts[this.columnNo];
        }

        get shortestColumnIndex() {
            return this.layout.columnHeights.indexOf(
                Math.min(...this.layout.columnHeights));
        }

        set item(item) {
            this.layout.columns[this.shortestColumnIndex].push(this.items.push(item) - 1);
        };

        setHeight = (height) => {
            console.log(this.layout)
            this.itemHeights.push(height);
            this.layout.columnHeights[this.shortestColumnIndex] += height;
        };

        componentDidMount() {
            this.props.getXs().then(response => {
                response.xs.forEach((x) => {
                    this.item = x;
                    this.setState(prevState => prevState);
                });
            });
            // window.addEventListener('resize', this.handleWindowResize)
        }

        // componentWillUnmount() {
        //     window.removeEventListener('resize', this.handleWindowResize)
        // }
        //
        // handleWindowResize = () => {
        //     console.log("resize")
        // };
        //
        // handleScrolledToBottom = () => {
        // };

        render() {
            let ItemWithComponentAndSetHeight = Item(Component)(this.setHeight);
            return (
                <>
                    {
                        compose(Table,
                            map(Column),
                            // map(map((item) => <ItemWithComponentAndSetHeight item={item}/>)),
                            map(map(Item(Component)(this.setHeight))),
                            map(map((x) => this.items[x]))
                        )(this.state.columns)
                    }
                </>
            )
        }
    }

    ComponentWithMasonryLayout.propTypes = {
        getXs: PropTypes.func.isRequired,
    };

    return ComponentWithMasonryLayout;
};

export default withMasonryLayout;
