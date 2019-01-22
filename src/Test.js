import React, {Component} from "react";

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {count: 0};
    }

    add = () => {
        this.setState({count: this.state.count + 1}, () => console.log(this.state));
        // this.setState((prevState) => ({count: prevState.count + 1}), () => console.log(this.state));
        console.log("finish first");
        this.setState({count: this.state.count + 1}, () => console.log(this.state));
        // this.setState((prevState) => ({count: prevState.count + 1}), () => console.log(this.state));
        console.log("finish second");
        // this.setState({count: this.state.count + 1});
    }

    render() {
        return (
            <div>
                {this.state.count}
                <button onClick={this.add}>C</button>
            </div>
        )
    }
}

export default Test;