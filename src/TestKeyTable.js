import React from 'react';
import TestKeyItem from './TestKeyItem';
import * as R from "ramda";

class TestKeyTable extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {table: [[1, 2], [3, 4]]};
        this.state = {table: [[1,2], [3,4]]};
    }

    componentDidMount() {
        console.log('Table Did Mount');
    }

    handleClick1 = () => {
        this.setState({table: [[1,3], [2,4]]});
    }

    handleClick2 = () => {
        this.setState({table: [[1,2], [3,4]]});
    }

    render() {
        return (
            <>
                {R.map(R.map(
                x => {
                         return <TestKeyItem key={x}>{x}</TestKeyItem>
                     }
                ))(this.state.table)}
                <button onClick={this.handleClick1}>change order</button>
                <button onClick={this.handleClick2}>change order</button>
            </>
        )
    }
}

export default TestKeyTable;