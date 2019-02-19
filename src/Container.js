import React from 'react';
import * as R from 'ramda';

// createContext后边的参数是default value，这个值只有在没有provider的时候才会有用，实际就是在测试的时候有用。
const NameContext = React.createContext({name: 'defaultName'});
const AgeContext = React.createContext();

// 这种方法，可以subscribe多个context，而且function或者class Component都可以使用。
let Item1 = (props) => (
    <NameContext.Consumer>
        {value => <div>{value.name}</div>}
    </NameContext.Consumer>
)

// subscribe多个context例子
class Item2 extends React.Component {
    render() {
        return (
            <NameContext.Consumer>
                {state => (
                    <AgeContext.Consumer>
                        {age => <div>{state.name}{age}</div>}
                    </AgeContext.Consumer>
                )}
            </NameContext.Consumer>
        )
    }
}

// 这种方法，只能subscribe一个context，但只能用在class component上
class Item3 extends React.Component {
    // static contextType = NameContext;
    render() {
        return <div>{this.context.name}</div>
    }
}
Item3.contextType = NameContext;

// 如果Item需要更新Container的state，可以把这个方法放在state里用context传过去
class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: 'wangbo'}
    }

    handler = (e) => {
        this.setState({name: 'hunan'});
    };

    render() {
        return (
            // Provider必须提供value,
            // 注意在value里只能使用primitive，如果value={{a:10}}这种，每次re-render Container，都会新建
            // value这个object，导致reference变了，导致进一步触发re-render所有consumer
            <NameContext.Provider value={this.state}>
                <AgeContext.Provider value={10}>
                    <Item1/>
                    <Item2/>
                    <Item3/>
                    <button onClick={this.handler}>cc</button>
                </AgeContext.Provider>
            </NameContext.Provider>
        )
    }
}

// 测试目的：二维数组，我希望跨列交换element的时候，不触发componentDidMount。
// 我想到能影响React判断一个Item是不是不用remount的依据，无非就是key和reference（就是React Element这个object的reference）
// 所以做了以下测试：
// 1. 保持跨列交换的时候Key不变，不行，还是触发componentDidMount；
// 2. 保持key和reference都不变，不行，还是触发componentDidMount。
// class Container extends React.Component {
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
// class Container extends React.Component {
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


// class Container extends React.Component {
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
// class Container extends React.Component {
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

export default Container;