import React from 'react';
import PropTypes from "prop-types";

const withMasonryLayout = Component => {
    class ComponentWithMasonryLayout extends React.Component {
        constructor(props) {
            super(props);

            this.columnNo = 3;
            this.allXs = []; // 一维数组，记录的是所有的xs
            this.columnHeights = new Array(this.columnNo).fill(0); // 一维数组，每列的高度。
            this.state = {
                columns: new Array(this.columnNo).fill([]) // 二维数组，存的是每列包含的那部分xs
            };
        }

        appendX = (x, columnHeights) => {
            this.setState((prevState) => {
                let newColumnXs = new Array(columnHeights.length);
                let iMin = columnHeights.indexOf(Math.min(...columnHeights));
                console.log(columnHeights)
                for (let i = 0; i < columnHeights.length; i++) {
                    newColumnXs[i] = (i === iMin) ? prevState.columns[i].concat(x) : prevState.columns[i];
                }
                return {columns: newColumnXs};
            })
        }

        updateColumnHeights = (xHeight) => {
            let iMin = this.columnHeights.indexOf(Math.min(...this.columnHeights));
            this.columnHeights[iMin] = this.columnHeights[iMin] + xHeight;
        }

        handleWindowResize = () => {
            console.log("resize")
        }

        handleScrolledToBottom = () => {
        }

        componentDidMount() {
            this.props.getXs().then(response => {
                this.allXs = this.allXs.concat(response.xs);
                response.xs.map((x) => {
                    this.appendX(x, this.columnHeights);
                })
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
                                            (x) => <Component id={x.title} width={'20rem'} updateColumnHeights={this.updateColumnHeights}/>
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
