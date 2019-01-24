import React from 'react';

// 这个类所有http方法的返回都是单个resource object，也就是x。
const withRestResource = apiUrl => Component => {
    return class ComponentWithRestResource extends React.Component {
        constructor(props) {
            super(props);
            this.state = {x: {}};
        }

        getX = (id) => {
            fetch(apiUrl +  '/' + id)
                .then(response => response.json())
                .then(obj => (this.setState({x: obj})))
        };

        postX = (newComment) => {
            // this.getXs(); // 这里应该把newComment post过去
            // 这里应该用上边的post的返回值concat。
            // this.setState(prevState =>
                // ({_embedded: {[serviceFolder]: prevState._embedded[serviceFolder].concat(newComment)}}));
        };

        putX = (id) => (modifiedComment) => {
        };

        deleteX = (id) => {
        };

        render() {
            return <Component
                x={this.state.x}
                getX={this.getX}
                postX={this.postX}
                putX={this.putX}
                deleteX={this.deleteX}
                />
        }
    }
};

export default withRestResource;