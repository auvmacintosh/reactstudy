import React from "react";
import {ContextFs, ContextWiw} from "./DataWindow";

const MockComponent = () => {
    const wiw = React.useContext(ContextWiw); // Window inner width
    const fs = React.useContext(ContextFs); // Font size

    return (
        <>
            <label>
                {'Window Inner Width: '}
                <span>{wiw.toString()}</span>
            </label>
            <br/>
            <label>
                {'Font Size: '}
                <span>{fs.toString()}</span>
            </label>
        </>
    )
};

export default MockComponent;