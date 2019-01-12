import React, {Component} from 'react';
import style from './CreateComment.module.css';

class CreateComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            id: 0,
            user: ''
        }
    }

    handleUserChange = (e) => this.setState({user: e.target.value});

    handleContentChange = (e) => this.setState({content: e.target.value});

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.appendComment({
            content: this.state.content,
            id: this.state.id,
            user: this.state.user
        });
        this.setState({
            content: '',
            id: 0,
            user: ''
        });
    }

    render() {
        return (
            <div className={style.container}>
                <form className={style.form} onSubmit={this.handleSubmit}>
                    <input
                        name='user'
                        value={this.state.user}
                        onChange={this.handleUserChange}
                        type="text"
                        placeholder="Your name ..."
                    />
                    <input
                        name='content'
                        value={this.state.content}
                        onChange={this.handleContentChange}
                        type="text"
                        placeholder="Comment here ..."
                    />
                    <div>
                        <button type="submit">Comment</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateComment;
