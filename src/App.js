import React from 'react';
import Post from './Post';
import CommentBox from './CommentBox';
import withHalJsonResources from './withHalJsonResources'
import style from './App.module.css'
import Login from './Login'
import RandomHeightBlock from "./RandomHeightBlock";

class App extends React.Component {
    // 使用function版的setState可以保证synchronize，而且可以使用prevState。
    // appendComment = (newComment) => {
    //     this.setState(prevState => ({comments: prevState.comments.concat(newComment)}));
    // }

    render() {
        const PostWithData =
            withHalJsonResources('http://localhost:3000/staticapi')('post')(Post);

        const CommentListWithData =
            withHalJsonResources('http://localhost:3000/staticapi')('comments')(CommentBox);

        // return (
        //     <div className={style.container}>
        //         <div className={style.brace}/>
        //         <PostWithData />
        //         <CommentListWithData />
        //     </div>
        // )

        // return <Login></Login>

        return (
            <RandomHeightBlock id={1} width={'20rem'}/>
        )
    }
}

export default App;