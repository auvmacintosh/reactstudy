import React from 'react';
import Comment from './Comment';
import PropTypes from "prop-types";
import CreateComment from "./CreateComment"

// default parameter could also put in the App-cushooks.jshooks.js, but I like this way.
// array里的Component要有key attribute，不然报警

class CommentBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {xs: []};
    }

    componentDidMount() {
        this.props.getXs().then(response => this.setState({xs: response.items}));
        // this.props.getXs().then(response => this.setState(response)); // 这个state还包含page，如果page没用，就别放state里了
    }

    render() {
        return (
            <>
                {this.state.xs.map(
                    ({id, user, content}) =>
                        <Comment key={id} user={user} content={content}/>
                )}
                <CreateComment httpPost={this.props.httpPost}/>
            </>
        )
    }
}

// If <> does not work or is not supported by your IDE, you can use <React.Fragment> instead.
// 后来因为要使用componentDidMount，所以用不了functional component了
// const CommentBox = ({_embedded: {comments = []} = {comment: []}, postUrl}) => {
//     return (
//         <>
//             {comments.map(
//                 ({content, user, content}) =>
//                     <Comment key={content} user={user} content={content}/>
//             )}
//             <CreateComment postUrl={postUrl}/>
//         </>
//     )
// }

// return map()的时候和有趣，这里如果加了{}就报错了，因为return了多个element，但是不加{}就能执行。不知道是不是默认添加了<>不过还是不要用这种语法了，没有看到说明。可以去stackoverflow问一下
// const CommentBox = ({_embedded: {comments = []} = {comment: []}}) => {
//     return (
//         comments.map(
//             ({content, user, content}) =>
//                 <Comment key={content} user={user} content={content}/>
//         )
//     )
// }

CommentBox.propTypes = {
    getXs: PropTypes.func.isRequired,
}

export default CommentBox;