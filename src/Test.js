import React from 'react';
//
// class Test extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {a: {b: {c:1}}};
//         // this.state = {a: 1};
//         // this.state = {s: 1};
//     }
//
//     handleClick = () => {
//         this.state.a.b.c = 2;
//         // this.state.a = 2;
//         // this.setState(ps=>ps);
//         this.setState(this.state); // 这里修改成功了，如果用this.setState(this.state)你会发现s已经是2了
//         // this.setState((pS)=>{ // 但是functional的setState还是之前的state
//         //     console.log(pS); // 1，但是还保存着previous state
//         //     console.log(this.state); // 1，但是还保存着previous state
//         // });
//
//     }
//
//
//     render() {
//         return (
//             <>
//                 <div>{this.state.a.b.c}</div>
//                 <button onClick={this.handleClick}>setState</button>
//             </>
//         )}
// }

class ListOfWords extends React.PureComponent {
    render() {
        console.log(this.props.words)
        return <div>{this.props.words.a}</div>;
    }
}

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            words: ['marklar']
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        // This section is bad style and causes a bug
        // this.state.words.push('mike');
        // this.state.words.a='mike';
        // this.setState((ps)=>{return {words: ps.words.concat(['mike'])}});
        this.setState((ps)=>{ps.words.push('mike')});
        console.log(this.state);
    }

    render() {
        return (
            <div>
                {/*<ListOfWords words={this.state.words} />*/}
                {this.state.words.map((x)=><div>{x}</div>)}
                <button onClick={this.handleClick} />
            </div>
        );
    }
}

export default Test;