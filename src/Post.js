import React, {Component} from 'react';
import style from './Post.module.css';
import PropTypes from 'prop-types';

const Post = ({id, user, content}) => (
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

const withData = url => MyComponent => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {id: null, user: " ", content: null};
        }

        componentDidMount() {
            fetch(url)
                .then(response => response.json())
                .then(o => this.setState(o._embedded.posts[0]))
        }

        render() {
            return <MyComponent {...this.props} {...this.state}/>
        }
    }
}

const PostWithData = withData('http://localhost:3000/staticapi/posts.json')(Post);

class Post1 extends Component {
    constructor(props) {
        super(props);
        this.state = {id: null, user: " ", content: null};
    }

    componentDidMount() {
        fetch('http://localhost:3000/staticapi/posts.json')
            .then(response => response.json())
            .then(o => this.setState(o._embedded.posts[0]))
    }

    render() {
        return (
            <div className={style.container}>
                <div className={style.title}>
                    <div className={style.user}><a
                        href={this.state.user}>{this.state.user.split(' ')[0]} posted</a></div>
                    <div className={style.comment_count}>5 comments</div>
                </div>
                <div className={style.content}>
                    <div>{this.state.content}</div>
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

export default PostWithData;