import React, {Component} from 'react';
import Comment from './Comment';
import data from "./data";

// array里的Component要有key attribute，不然报警
const CommentList = ({_embedded: {comments}}) => {
    console.log(comments);
    return (
        comments.map(
            ({id, user, content}) =>
                <Comment key={id} user={user} content={content}/>
        )
    )
}

export default CommentList;