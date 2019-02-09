import React from 'react';

class TestKeyItem extends React.Component {
    componentDidMount() {
        console.log('Item Did Mount');
    }

    render() {
        console.log(this.props.children)
        return <div>{this.props.children}</div>;
    }
}

export default TestKeyItem