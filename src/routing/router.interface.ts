import {Router} from 'express'

export interface RoutingBinding{
    intializeRoutes(): void;
    router: Router;
}