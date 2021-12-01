import { Worker } from 'worker_threads'

export const build = () => new Worker('./factory.js')