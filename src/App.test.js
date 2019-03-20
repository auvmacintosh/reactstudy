import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';
// import ReactTestUtils from 'react-dom/test-utils';

test("App changes the class when hovered", ()=> {
    const component = renderer.create(
        <App page="einfobank.net">hello</App>
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    tree[1].props.onMouseEnter();
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    tree[1].props.onMouseLeave();
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
