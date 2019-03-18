import React, {useReducer} from 'react';

function App() {
    // First render will create the state, and it will
    // persist through future renders
    const [sum, dispatch] = useReducer((sum, action) => {
        console.log(action);
        return sum + action;
    }, 0);

    return (
        <>
            {sum}

            <button onClick={() => dispatch(1)}>
                Add 1
            </button>
        </>
    );
}

export default App;