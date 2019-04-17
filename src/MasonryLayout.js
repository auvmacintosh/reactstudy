import React from 'react';

const spinnerStyle = {
    padding: '10px',
};

const columnStyle = {
    display: 'flex',
    flexDirection: 'column',
};

const MasonryLayout = ({items}) => {
    return (
        <div style={columnStyle}>
            {items.map((item, i) => <div key={i}>{item._links.self.href.split('/').tail() + item.title}</div>)}
            <div style={spinnerStyle}></div>
        </div>
    );
}

export default MasonryLayout;
