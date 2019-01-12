import React, {Component} from 'react';
import style from './Post.module.css';
import PropTypes from 'prop-types';

class Post extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={style.container}>
                <div className={style.title}>
                    <div className={style.user}><a href={this.props.post.user}>{this.props.post.user.split(' ')[0]} posted</a></div>
                    <div className={style.comment_count}>{this.props.commentsLength} comments</div>
                </div>
                <div className={style.content}>
                    <div>{this.props.post.content}</div>
                </div>
            </div>
        );
    }
}

Post.propTypes = {
    commentsLength: PropTypes.number,
    post: PropTypes.shape({
        content: PropTypes.string,
        id: PropTypes.number,
        user: PropTypes.string
    })
}

export default Post;