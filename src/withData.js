import React, {Component} from 'react';

const withData = url => MyComponent => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = this.props.initState;
        }

        componentDidMount() {
            fetch(url)
                .then(response => response.json())
                .then(obj => this.setState(obj))
        }

        render() {
            return <MyComponent {...this.state}/>
        }
    }
}

export default withData;