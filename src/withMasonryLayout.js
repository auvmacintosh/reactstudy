import React from 'react';
import PropTypes from "prop-types";
import {map, prop} from "ramda";

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

        set item(x) {
            this.layout.columns[this.shortestColumnIndex].push(this.items.push(x) - 1);
        };

        componentDidMount() {
            this.props.getXs().then(response => {
                // this.items.push(response.items);
                response.xs.forEach((x) => {
                    this.item = x;
                    this.setState(prevState => prevState);
                });
            });
            window.addEventListener('resize', this.handleWindowResize)
        }

        setHeight = (height) => {
            this.itemHeights.push(height);
            this.layout.columnHeights[this.shortestColumnIndex] += height;
        };

        componentWillUnmount() {
            window.removeEventListener('resize', this.handleWindowResize)
        }

        // handleWindowResize = () => {
        //     console.log("resize")
        // };
        //
        // handleScrolledToBottom = () => {
        // };

        itemDom = (x, i) => {
            return <Component key={i} indexInAllXs={x}
                              content={this.items[x].title} width={'20rem'}
                              setHeight={this.setHeight}/>
        }

        columnDom = (column, i) => {
            return (<div key={i} style={{display: 'flex', flexDirection: 'column', width: '20rem',}}>
                    {map(this.itemDom)(column)}
                </div>
            )
        }


        render() {
            return (<div style={{display: 'flex', flexDirection: 'row',}}>
                    {map(this.columnDom)(this.state.columns)}
                </div>
            )
        }
    }

    ComponentWithMasonryLayout.propTypes = {
        getXs: PropTypes.func.isRequired,
    };

    return ComponentWithMasonryLayout;
};

export default withMasonryLayout;
