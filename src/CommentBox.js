import React, {Component} from 'react';
import Post from './Post';
import Comment from './Comment';
import CreateComment from './CreateComment';
import data from './data';
import style from './CommentBox.module.css'

class CommentBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: data.post,
            comments: data.comments
        };
    }

    // 使用function版的setState可以保证synchronize，而且可以使用prevState。
    appendComment = (newComment) => {
        this.setState(prevState => ({comments: prevState.comments.concat(newComment)}));
    }

    render() {
        return (
            <div className={style.container}>
                <div className={style.brace}/>
                <Post/>
                {/*array里的Component要有key attribute，不然报警*/}
                {this.state.comments.map(
                    ({id, user, content}) =>
                        <Comment key={id} user={user} content={content}/>
                )}
                <CreateComment appendComment={this.appendComment}/>
            </div>
        )
    }
}

export default CommentBox;