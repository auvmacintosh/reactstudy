import React from 'react';

// Child里边放所有的逻辑
class Child extends React.Component {
    constructor(props) {
        super(props);
        this.state = {s: 'Content'}
    }
    // handler changes state
    render() {
        return <div>{this.props.render(this.state.s)}</div>
    }
}

// Parent负责render的事
const Parent = () => (
    <>
        <h1>title</h1>
        <Child render={(x)=><p>{x}</p>}/>
    </>
)

export default Parent;