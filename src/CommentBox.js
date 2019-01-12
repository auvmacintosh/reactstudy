import React, {Component} from 'react';
import Post from './Post';
import Comment from './Comment';
import CreateComment from './CreateComment';
import data from './data';
import style from './CommentBox.module.css'

class CommentBox extends Component {
    constructor(props) {
        super(props);
        this.state = {comments: data.comments};
    }

    appendComment = (newComment) => this.setState({comment: this.state.comments.push(newComment)});

    render() {
        return (
            <div className={style.container}>
                <div className={style.brace}/>
                <Post post={data.post} commentsLength={this.state.comments.length}/>
                {this.state.comments.map(comment => <Comment comment={comment}/>)}
                <CreateComment appendComment={this.appendComment}/>
            </div>
        )
    }
}

export default CommentBox;