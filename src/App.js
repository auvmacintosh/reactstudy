import React, {Component} from 'react';
import Post from './Post';
import CommentBox from './CommentBox';
// import CreateComment from './CreateComment';
import withHalJsonResource from './withHalJsonResource'
import style from './App.module.css'

class App extends Component {
    // 使用function版的setState可以保证synchronize，而且可以使用prevState。
    // appendComment = (newComment) => {
    //     this.setState(prevState => ({comments: prevState.comments.concat(newComment)}));
    // }

    render() {
        const PostWithData =
            withHalJsonResource('http://localhost:3000/staticapi')('post')(Post);

        const CommentListWithData =
            withHalJsonResource('http://localhost:3000/staticapi')('comments')(CommentBox);

        return (
            <div className={style.container}>
                <div className={style.brace}/>
                <PostWithData />
                <CommentListWithData />
                {/*<CreateComment appendComment={this.appendComment}/>*/}
            </div>
        )
    }
}

export default App;