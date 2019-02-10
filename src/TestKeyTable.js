import React from 'react';
import TestKeyItem from './TestKeyItem';
import * as R from "ramda";

class TestKeyTable extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {table: [[1, 2], [3, 4]]};
        this.state = {table: [[1, 2], [3, 4]], a: 1};
    }

    componentDidMount() {
        console.log('Table Did Mount');
    }

    handleClick1 = () => {
        this.state = {table: [[1, 3], [2, 4]], a: 2};
        console.log(this.props.a)
        this.props.a.b=2;
        this.setState((s,p)=>{
            console.log(s);
            console.log(p);
        });
    }

    handleClick2 = () => {
        this.setState({table: [[1, 2], [3, 4]]});
    }

    render() {
        return (
            <>
                {R.map(R.map(
                    x => {
                        return <TestKeyItem key={x}>{x}</TestKeyItem>
                    }
                ))(this.state.table)}
                <button onClick={this.handleClick1}>{this.state.a}</button>
                <button onClick={this.handleClick2}>change order</button>
            </>
        )
    }
}

export default TestKeyTable;