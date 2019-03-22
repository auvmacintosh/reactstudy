import React from 'react';

class FileInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.selectedFiles);
    };

    handleSelectedFile = (e) => {
        e.preventDefault();
        this.setState({
            selectedFiles: e.target.files,
            loaded: 0,
        })
    }

    // multiple 可以多选文件。
    // accept列表里的文件类型才在选择列表里出现。
    // 没有encType="multipart/form-data"，上传的只有文件名没有文件本身
    render() {
        return (
            <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
                <label>
                    Upload file:
                    <input type="file"
                           multiple
                           accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                           onChange={this.handleSelectedFile}/>
                </label>
                <br/>
                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default FileInput;