import React from 'react';
import * as R from 'ramda';

const NameContext = React.createContext('wangbo');
console.log(NameContext);

class Item extends React.Component {
    // static contextType = NameContext;
    render() {
        console.log(this)
        return (
            <NameContext.Consumer>
                {x=><div>{x}</div>}
            </NameContext.Consumer>
        )
    }
}


class Test extends React.Component {
    constructor(props) {
        super(props);
        this.ItemEl = React.createRef();
    }

    handler = (e) => {
        this.ItemEl.current.style.fontSize = '100px';
    };

    render() {
        return (
            <NameContext.Provider value='hn'>
                <Item/>
                <button onClick={this.handler}>cc</button>
            </NameContext.Provider>
        )

    }
}

// 测试目的：二维数组，我希望跨列交换element的时候，不触发componentDidMount。
// 我想到能影响React判断一个Item是不是不用remount的依据，无非就是key和reference（就是React Element这个object的reference）
// 所以做了以下测试：
// 1. 保持跨列交换的时候Key不变，不行，还是触发componentDidMount；
// 2. 保持key和reference都不变，不行，还是触发componentDidMount。
// class Test extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
//     }
//
//     handler = (e) => {
//         e.preventDefault();
//     };
//
//     handleChange = ({target}) => {
//         console.log(this.state);
//         return this.setState({[target.name]: target.value});
//     }
//
//     render() {
//         console.log(this.state.ta)
//         return (
//             <>
//                 <label>
//                     Essay:
//                     <textarea name='ta' value={this.state.ta} onChange={this.handleChange} />
//                 </label>
//             </>
//         )
//     }
// }
//
// class Item extends React.Component {
//     componentDidMount() {
//         console.log("item did mount");
//     }
//
//     render() {
//         return <div>{this.props.x}</div>
//     }
// }

// function WarningBanner({warn}) {
//     if (!warn) {
//         return false;
//     }
//
//     return <div>Warning</div>;
// }
//
// class Test extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {warn: true};
//     }
//
//     handler = () => {
//         this.setState(ps => ({warn: !ps.warn}));
//     }
//
//     render() {
//         return (
//             <>
//                 <WarningBanner warn={this.state.warn}/>
//                 <button onClick={this.handler}>{this.state.warn ? 'Hide' : 'Show'}</button>
//             </>
//         )
//     }
// }


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

// class ListOfWords extends React.PureComponent {
//     render() {
//         console.log(this.props.words)
//         return <div>{this.props.words.a}</div>;
//     }
// }
//
// class Test extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             words: ['marklar']
//         };
//         this.handleClick = this.handleClick.bind(this);
//     }
//
//     handleClick() {
//         // This section is bad style and causes a bug
//         // this.state.words.push('mike');
//         // this.state.words.a='mike';
//         // this.setState((ps)=>{return {words: ps.words.concat(['mike'])}});
//         this.setState((ps)=>{ps.words.push('mike')});
//         console.log(this.state);
//     }
//
//     render() {
//         return (
//             <div>
//                 {/*<ListOfWords words={this.state.words} />*/}
//                 {this.state.words.map((x)=><div>{x}</div>)}
//                 <button onClick={this.handleClick} />
//             </div>
//         );
//     }
// }

export default Test;