import React, {Component} from 'react';
import style from './Post.module.css';
import PropTypes from 'prop-types';

class Post extends Component {

    render() {
        return (
            <div className={style.container}>
                <div className={style.title}>
                    <div className={style.user}><a
                        href={this.props.user}>{this.props.user.split(' ')[0]} posted</a></div>
                    <div className={style.comment_count}>{this.props.commentsLength} comments</div>
                </div>
                <div className={style.content}>
                    <div>{this.props.content}</div>
                </div>
            </div>
        );
    }
}

Post.propTypes = {
    id: PropTypes.number,
    user: PropTypes.string,
    content: PropTypes.string,
    commentsLength: PropTypes.number,
}

export default Post;