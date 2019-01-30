import React from 'react';
import PropTypes from "prop-types";
import {compose, map} from "ramda";

const withSetHeightOnDidMount = setHeight => Component => {
    class ItemWithComponentAndSetHeight extends React.Component {
        componentDidMount() {
            const height = this.divElement.clientHeight;
            console.log(height)
            setHeight(height);
        }

        render() {
            console.log('fuck')
            return (
                <div ref={(divElement) => this.divElement = divElement}>
                    <Component item={this.props.item}/>
                </div>
            )
        }
    }

    ItemWithComponentAndSetHeight.propTypes = {
        item: PropTypes.object,
    };

    return ItemWithComponentAndSetHeight;
}
//
// const ItemOld = (Component) => (setHeight) => (item) => {
//     return <Component setHeight={setHeight}
//                       item={item}
//     />
// }

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

            this.Item = withSetHeightOnDidMount(this.setHeight)(Component);
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
            // console.log(this.layout)
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
            return (
                <>
                    {
                        compose(Table,
                            map(Column),
                            map(map(item => <this.Item item={item}/>)),
                            // map(map(ItemOld(Component)(this.setHeight))),
                            map(map(x => this.items[x]))
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
