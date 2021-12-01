
import { Router, Request, Response } from 'express';
import {RoutingBinding} from '../routing/router.interface'
 
class SettingsController implements RoutingBinding {
  public path: string = '/settings';
  public router: Router = Router();
 
  private settings: object = {}
 
  constructor() {
    this.intializeRoutes();
  }
 
  public intializeRoutes() {
    this.router.get(this.path, this.getSettings);
    this.router.post(this.path, this.setSettings);
  }
 
  getSettings = (_: Request, response: Response) => {
    response.send(this.settings);
  }
 
  setSettings = (request: Request, response: Response) => {
    const settings: object = request.body;
    this.settings = settings;
    response.send(settings);
  }
}
 
export default SettingsController;