import React from 'react';
import PropTypes from "prop-types";

const withMasonryLayout = Component => {
    class ComponentWithMasonryLayout extends React.Component {
        constructor(props) {
            super(props);
            this.columnNo = 3;
            this.allXs = []; // 一维数组，记录的是所有的xs
            this.heightOfAllXs = [];

            this.layouts = {};
            this.layouts[this.columnNo] = {
                indexOfLastX: -1,
                columnHeights: Array(this.columnNo).fill(0), // 一维数组，每列的高度。
                columns: [...Array(this.columnNo)].map(() => []), // 二维数组，存的是每列包含的那部分xs的indexOfAllXs
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

        set x(x) {
            this.layout.columns[this.shortestColumnIndex].push(this.allXs.push(x) - 1);
        };

        setHeight = (height) => {
            this.heightOfAllXs.push(height);
            this.layout.columnHeights[this.shortestColumnIndex] += height;
        };

        handleWindowResize = () => {
            console.log("resize")
        };

        handleScrolledToBottom = () => {
        };

        componentDidMount() {
            this.props.getXs().then(response => {
                // this.allXs.push(response.xs);
                response.xs.forEach((x) => {
                    this.x= x;
                    this.setState(prevState => prevState);
                });
            });
            window.addEventListener('resize', this.handleWindowResize)
        }

        componentWillUnmount() {
            window.removeEventListener('resize', this.handleWindowResize)
        }

        render() {
            return (<div style={{display: 'flex', flexDirection: 'row',}}>
                    {this.state.columns.map((column, i) => {
                            return (<div key={i} style={{display: 'flex', flexDirection: 'column', width: '20rem',}}>
                                    {column.map((x, i) => {
                                            return <Component key={i} indexOfAllXs={x}
                                                              content={this.allXs[x].title} width={'20rem'}
                                                              setHeight={this.setHeight}/>
                                        }
                                    )}
                                </div>
                            )
                        }
                    )}
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
