import React, {useReducer} from 'react';

function App() {
    // First render will create the state, and it will
    // persist through future renders
    const [sum, dispatch] = useReducer((sum, action) => {
        switch (action.type) {
            case "add":
                return sum + action.value;
            case "minus":
                return sum - action.value;
            default:
                return sum;
        }
    }, 0);

    const handler = e => {
        switch (e.target.name) {
            case 'add':
                dispatch({type: 'add', value: 1});
                break;
            case 'minus':
                dispatch({type: 'minus', value: 1})
                break;
            default:
                console.log('no such handler ' + e.target.name);
        }
    };

    return (
        <>
            {sum}
            <button name='add' onClick={handler}>Add</button>
            <button name='minus' onClick={handler}>Minus</button>
        </>
    );
}

export default App;