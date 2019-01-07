import React, {Component} from 'react';
import style from './CreateComment.module.css';

class CreateComment extends Component {
    render() {
        return (
            <div className={style.container}>
                <form className={style.form}>
                    <input type="text" placeholder="Comment here ..." name="newComment" id="newComment"/>
                    <div>
                        <button type="submit">Comment</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateComment;
