import React, {Component} from 'react';
import Post from './Post';
import CommentList from './CommentList';
import CreateComment from './CreateComment';
import withData from './withData'
import style from './App.module.css'

class App extends Component {
    constructor(props) {
        super(props);

    }

    // 使用function版的setState可以保证synchronize，而且可以使用prevState。
    appendComment = (newComment) => {
        this.setState(prevState => ({comments: prevState.comments.concat(newComment)}));
    }

    render() {
        const PostWithData =
            withData('http://localhost:3000/staticapi/post.json')(Post);
        const postWithDataInitState = {user: " ", content: ""};

        const CommentListWithData =
            withData('http://localhost:3000/staticapi/comments.json')(CommentList);
        const commentListWithDataInitState = {_embedded: {comments: []}};

        return (
            <div className={style.container}>
                <div className={style.brace}/>
                <PostWithData initState={postWithDataInitState}/>
                <CommentListWithData initState={commentListWithDataInitState}/>
                <CreateComment appendComment={this.appendComment}/>
            </div>
        )
    }
}

export default App;