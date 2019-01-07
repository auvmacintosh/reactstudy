import React, {Component} from 'react';
import Post from './Post';
import Comment from './Comment';
import CreateComment from './CreateComment';
import data from './data';
import style from './CommentBox.module.css'

class CommentBox extends Component {
    constructor(props) {
        super(props);
    }

    renderComments(comments) { // 为什么这么写就不行
        comments.map((comment) => {
            return (
                <Comment comment={comment} />
            )
        });
    }

    render() {
        return (
            <div className={style.container}>
                <div className={style.brace} />
                <Post post={data.post} comments={data.comments} />
                {data.comments.map((comment)=>{return <Comment comment={comment}/>})}
                <CreateComment/>
            </div>
        )
    }
}

export default CommentBox;