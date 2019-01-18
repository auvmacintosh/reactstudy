import React from 'react';
import Comment from './Comment';
import PropTypes from "prop-types";

// default parameter could also put in the App.js, but I like this way.
// array里的Component要有key attribute，不然报警
const CommentList = ({_embedded: {comments = []} = {comment: []}}) => {
    return (
        comments.map(
            ({id, user, content}) =>
                <Comment key={id} user={user} content={content}/>
        )
    )
}

CommentList.propTypes = {
    _embedded: PropTypes.shape({
        comments: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            user: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired
        }))
    })
}

export default CommentList;