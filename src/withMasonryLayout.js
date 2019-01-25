import React from 'react';
import PropTypes from "prop-types";

const withMasonryLayout = Component => {
    class ComponentWithMasonryLayout extends React.Component {
        constructor(props) {
            super(props);
            this.columnNo = 3;
            this.allXs = []; // 一维数组，记录的是所有的xs

            this.layouts = {};
            this.layouts[this.columnNo] = {
                indexOfLastX: '',
                columnHeights: Array(this.columnNo).fill(0), // 一维数组，每列的高度。
                columns: [...Array(this.columnNo)].map(()=>[]), // 二维数组，存的是每列包含的那部分xs
            }

            this.state = {
                columns: this.layouts[this.columnNo].columns
            };
        }

        appendX = (layout, x) => {
            let iMin = layout.columnHeights.indexOf(Math.min(...layout.columnHeights));
            layout.columns[iMin].push(x);
        }

        updateColumnHeights = (layout, heightOfX) => {
            let iMin = layout.columnHeights.indexOf(Math.min(...layout.columnHeights));
            layout.columnHeights[iMin] += heightOfX;
        }

        handleWindowResize = () => {
            console.log("resize")
        }

        handleScrolledToBottom = () => {
        }

        componentDidMount() {
            this.props.getXs().then(response => {
                this.allXs.push(response.xs);
                response.xs.forEach((x) => {
                    this.appendX(this.layouts[this.columnNo], x);
                    this.setState(prevState => prevState);
                });
            });
            window.addEventListener('resize', this.handleWindowResize)
        }

        componentWillUnmount() {
            window.removeEventListener('resize', this.handleWindowResize)
        }

        render() {
            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                }}>
                    {
                        this.state.columns.map(
                            (column) => {
                                return (
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '20rem',
                                    }}>
                                        {column.map(
                                            (x) => <Component id={x.title} width={'20rem'}
                                                              updateColumnHeights={this.updateColumnHeights.bind(this, this.layouts[[this.columnNo]])}/>
                                        )}
                                    </div>
                                )
                            }
                        )
                    }
                </div>
            )
        }
    }

    ComponentWithMasonryLayout.propTypes = {
        getXs: PropTypes.func.isRequired,
    };

    return ComponentWithMasonryLayout;
}

export default withMasonryLayout;
