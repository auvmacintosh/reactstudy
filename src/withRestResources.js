import React from 'react';

// 这个类所有http方法的返回都是resource数组，也就是xs。
const withRestResources = apiUrl => Component => {
    return class ComponentWithRestResources extends React.Component {
        constructor(props) {
            super(props);
            this.serviceFolder = apiUrl.split('/').pop();
        }

        // 返回一个response，contains a object of items and page
        getXs = (page = 0, size = 10, sort = '') => (
            fetch(apiUrl + '?page=' + page + '&size=' + size + '&sort=' + sort)
                .then(response => response.json())
                .then(obj => ({
                    xs: obj._embedded[this.serviceFolder],
                    page: obj.page,
                }))
        );

        postX = (newComment) => {
            // this.getXs(); // 这里应该把newComment post过去
            // 这里应该用上边的post的返回值concat。
            // this.setState(prevState =>
            //     ({_embedded: {[this.serviceFolder]: prevState._embedded[this.serviceFolder].concat(newComment)}}));
        };

        putX = (id) => (modifiedComment) => {
        };

        deleteX = (id) => {
        };

        render() {
            return <Component
                getXs={this.getXs}
                postX={this.postX}
                putX={this.putX}
                deleteX={this.deleteX}
            />
        }
    }
};

export default withRestResources;