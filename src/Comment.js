import React, {Component} from 'react';
import style from './Comment.module.css'

class Comment extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className={style.container}>
                <div className={style.title}>{this.props.comment.user} commented</div>
                <div className={style.content}>{this.props.comment.content}</div>
            </div>
        )
    }
}

export default Comment;
