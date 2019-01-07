import React, {Component} from 'react';
import style from './Post.module.css';

class Post extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={style.container}>
                <div className={style.title}>
                    <div className={style.user}><a href={this.props.post.user}>{this.props.post.user.split(' ')[0]} posted</a></div>
                    <div className={style.comment_count}>{this.props.comments.length} comments</div>
                </div>
                <div className={style.content}>
                    <div>{this.props.post.content}</div>
                </div>
            </div>
        );
    }
}

export default Post;