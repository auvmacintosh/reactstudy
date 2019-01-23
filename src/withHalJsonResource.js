import React from 'react';

// 这个类所有http方法的返回都是单个resource object，也就是x。
const withHalJsonResource = apiUrl => MyComponent => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {x: {}};
        }

        httpGet = (id) => {
            fetch(apiUrl +  '/' + id)
                .then(response => response.json())
                .then(obj => (this.setState({x: obj})))
        };

        httpPost = (newComment) => {
            // this.httpGet(); // 这里应该把newComment post过去
            // 这里应该用上边的post的返回值concat。
            this.setState(prevState =>
                ({_embedded: {[serviceFolder]: prevState._embedded[serviceFolder].concat(newComment)}}));
        };

        httpPut = (id) => (modifiedComment) => {
        };

        httpDelete = (id) => {
        };

        render() {
            return <MyComponent
                httpGet={this.httpGet}
                httpPost={this.httpPost}
                httpPut={this.httpPut}
                httpDelete={this.httpDelete}
                x={this.state.x}/>
        }
    }
};

export default withHalJsonResource;