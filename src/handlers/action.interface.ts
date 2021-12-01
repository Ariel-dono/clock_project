import {Router} from 'express'

// define the handler binding interaction
export interface HandlerBinding{
    intializeRoutes(): void;
    router: Router;
}