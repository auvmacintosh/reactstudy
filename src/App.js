import React from 'react';
// import Post from './Post';
// import CommentBox from './CommentBox';
// import style from './App.module.css'
// import Login from './Login'
import withRestResources from './withRestResources'
import RandomColorBlock from "./RandomColorBlock";
import withMasonryLayout from "./withMasonryLayout";
import * as R from 'ramda';
import 'normalize.css';
import './last';
// import {ReactComponent as Loader} from './Loader1.svg'
import ParentComponent from './Parent';
import Child from './Child';

class App extends React.Component {
    // 使用function版的setState可以保证synchronize，而且可以使用prevState。
    // appendComment = (newComment) => {
    //     this.setState(prevState => ({comments: prevState.comments.concat(newComment)}));
    // }

    // PostWithData =
    //     withRestResources('http://localhost:3000/staticapi/post')(Post);
    // CommentListWithData =
    //     withRestResources('http://localhost:3000/staticapi/comments')(CommentBox);

    BlockWithMasonryWithRest = R.compose(
        withRestResources("http://localhost:8080/api/articles"),
        withMasonryLayout
    )(RandomColorBlock);

    render() {
        // return (
        //     <div className={style.container}>
        //         <div className={style.brace}/>
        //         <PostWithData />
        //         <CommentListWithData />
        //     </div>
        // )

        // return <Login></Login>

        // return <Loader/>

        // return (
        //     <this.BlockWithMasonryWithRest/>
        // )

        // return (<ParentComponent><Child /></ParentComponent>)
        return (
            <div>
                <ParentComponent />
            </div>
        )
    }
}

export default App;