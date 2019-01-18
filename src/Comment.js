import React, {Component} from 'react';
import style from './Comment.module.css';
import PropTypes from 'prop-types';

class Comment extends Component {
    render() {
        return (
            <div className={style.container}>
                <div className={style.title}>{this.props.user} commented</div>
                <div className={style.content}>{this.props.content}</div>
            </div>
        )
    }
}

Comment.propTypes = {
    user: PropTypes.string,
    content: PropTypes.string
}

export default Comment;
