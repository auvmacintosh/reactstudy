import React, {Component} from 'react';
import style from './Comment.module.css';
import PropTypes from 'prop-types';

class Comment extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={style.container}>
                <div className={style.title}>{this.props.comment.user} commented</div>
                <div className={style.content}>{this.props.comment.content}</div>
            </div>
        )
    }
}

Comment.propTypes = {
    comment: PropTypes.shape({
        content: PropTypes.string,
        id: PropTypes.number,
        user: PropTypes.string
    })
}

export default Comment;
