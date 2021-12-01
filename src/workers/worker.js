// worker action to execute
const { workerData, parentPort, threadId } = require('worker_threads')

console.log(workerData.action)

// event response before runnig the worker action
parentPort.postMessage({ message: workerData, status: 'Done', workerId: threadId })
