import React from 'react';
import Comment from './Comment';
import PropTypes from "prop-types";
import CreateComment from "./CreateComment"

// default parameter could also put in the App.js, but I like this way.
// array里的Component要有key attribute，不然报警

// return
// map()的时候和有趣，这里如果加了{}就报错了，因为return了多个element，但是不加{}就能执行。不知道是不是默认添加了<>不过还是不要用这种语法了，没有看到说明。可以去stackoverflow问一下
// const CommentBox = ({_embedded: {comments = []} = {comment: []}}) => {
//     return (
//         comments.map(
//             ({id, user, content}) =>
//                 <Comment key={id} user={user} content={content}/>
//         )
//     )
// }

// If <> does not work or is not supported by your IDE, you can use <React.Fragment> instead.
const CommentBox = ({_embedded: {comments = []} = {comment: []}}) => {
    return (
        <>
            {comments.map(
                ({id, user, content}) =>
                    <Comment key={id} user={user} content={content}/>
            )}
            <CreateComment/>
        </>
    )
}

CommentBox.propTypes = {
    _embedded: PropTypes.shape({
        comments: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            user: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired
        }))
    })
}

export default CommentBox;