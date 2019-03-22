const workerCode = () => {
    let onmessage = e => { // eslint-disable-line no-unused-vars
        console.log('Message received from main script: ' +  e.data);
        postMessage(e.data);
    };
};

// 下边是一个wrapper
const workerString = workerCode.toString();
const workerBlob = new Blob(
    [workerString.substring(workerString.indexOf("{")+1, workerString.lastIndexOf("}"))],
    {type: "application/javascript"}
);
const workerURL = URL.createObjectURL(workerBlob);

export default workerURL;
