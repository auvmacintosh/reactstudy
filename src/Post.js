import React from 'react';
import PropTypes from 'prop-types';
import style from './Post.module.css';

// default parameter make withHalJsonResource decouple with data structure
const Post = ({user = " ", content = ""}) => (
    <div className={style.container}>
        <div className={style.title}>
            <div className={style.user}>
                <a href={user}>{user.split(' ')[0]} posted</a></div>
            <div className={style.comment_count}>5 comments</div>
        </div>
        <div className={style.content}>
            <div>{content}</div>
        </div>
    </div>
)

Post.propTypes = {
    user: PropTypes.string,
    content: PropTypes.string
}

export default Post;