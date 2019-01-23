import React from 'react';

const withMasonryLayout =  MyComponent => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.columnNo = 3;
            // this.props.xs 保存各个Item的内容和高度，高度是set callback传进来的
            this.layoutLength = new Array(this.columnNo); // 一维数组，每列的长度。
            this.layoutLength.map(()=>0);
            this.state = {layout: new Array(this.columnNo)}; // 二维数组，存的是每列包含哪些xs
            this.state.layout.map(()=>[]);
        }

        
    }
}

export default withMasonryLayout;
