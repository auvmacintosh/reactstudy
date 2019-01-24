import React from 'react';
import Post from './Post';
import CommentBox from './CommentBox';
import withRestResources from './withRestResources'
import style from './App.module.css'
import Login from './Login'
import RandomColorBlock from "./RandomColorBlock";
import withMasonryLayout from "./withMasonryLayout";

class App extends React.Component {
    // 使用function版的setState可以保证synchronize，而且可以使用prevState。
    // appendComment = (newComment) => {
    //     this.setState(prevState => ({comments: prevState.comments.concat(newComment)}));
    // }

    render() {
        // const PostWithData =
        //     withRestResources('http://localhost:3000/staticapi/post')(Post);
        // const CommentListWithData =
        //     withRestResources('http://localhost:3000/staticapi/comments')(CommentBox);
        // return (
        //     <div className={style.container}>
        //         <div className={style.brace}/>
        //         <PostWithData />
        //         <CommentListWithData />
        //     </div>
        // )
        //
        // return <Login></Login>

        const BlockWithMasonryWithRest =
            withRestResources("http://localhost:8080/api/articles")(
                withMasonryLayout(RandomColorBlock)
            );
        return (
            <BlockWithMasonryWithRest/>
        )
    }
}

export default App;