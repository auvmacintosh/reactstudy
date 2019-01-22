import React, {Component} from 'react';

const withHalJsonResource = apiUrl => serviceFolder => MyComponent => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.url = apiUrl + "/" + serviceFolder;
        }

        getUrl = () => {
            fetch(this.url)
                .then(response => response.json())
                .then(obj => (this.setState(obj)))
        }

        postUrl = (newComment) => {
            // this.getUrl(); // 这里应该把newComment post过去
            // 这里应该用上边的post的返回值concat。
            this.setState(prevState =>
                ({_embedded: {[serviceFolder]: prevState._embedded[serviceFolder].concat(newComment)}}));
        }

        componentDidMount() {
            this.getUrl();
        }

        render() {
            return <MyComponent postUrl={this.postUrl} {...this.state}/>
        }
    }
}

export default withHalJsonResource;