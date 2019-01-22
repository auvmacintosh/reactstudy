import React, {Component} from 'react';
import style from './CreateComment.module.css';

class CreateComment extends Component {
    constructor(props) {
        super(props);
        this.state = {id: '5', user: '', content: ''}
    }

    // 用target.name处理所有input，这样就不用每个input一个handler了。
    // handleChange = (e) => this.setState({[e.target.name]: e.target.value});

    // destructuring parameter
    handleChange = ({target}) => this.setState({[target.name]: target.value});

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.postUrl({...this.state}); // spread attribute
        this.setState({id: '5', user: '', content: ''});
    }

    render() {
        return (
            <div className={style.container}>
                <form className={style.form} onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name='user'
                        value={this.state.user}
                        onChange={this.handleChange}
                        placeholder="Your name ..."
                    />
                    <input
                        type="text"
                        name='content'
                        value={this.state.content}
                        onChange={this.handleChange}
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
