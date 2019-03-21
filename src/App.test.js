import React from 'react';
import ReactDOM from 'react-dom';
// import './setupTests';  // setupTests.js在test之前会被自动执行
import App from './App';
import renderer from 'react-test-renderer';
import {render} from 'react-testing-library';

// smoke test with only jest
test('renders without crashing', ()=> {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
})

// snapshot test with react-test-renderer
// put x prefix to skip the test
xtest("App changes the class when hovered", ()=> {
    const component = renderer.create(
        <App page="einfobank.net">hello</App>
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

// unit test with react-testing-library
test('renders welcome message', () => {
    const { getByText } = render(<App>hello</App>);
    expect(getByText('hello')).toBeInTheDocument();
});
