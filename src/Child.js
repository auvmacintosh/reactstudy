import React from 'react';

const Child = props => {
    return <div>{props.render('Content')}</div>
}

export default Child;