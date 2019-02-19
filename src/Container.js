import React from 'react';
const Item = React.lazy(() => import('./Item')); // 只支持default export
const Container = () => (
    <div>
        <React.Suspense fallback={<div>Loading...</div>}>
            <Item/> {/* render Item的时候才import */}
        </React.Suspense>
    </div>
)

import("./add").then(add => {
    console.log(add.default(1, 2));
});

export default Container;