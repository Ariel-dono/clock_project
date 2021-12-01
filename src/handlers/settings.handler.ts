
import { Router, Request, Response } from 'express';
import {HandlerBinding} from './action.interface'
 
// API definition to set up clock levels to print
class SettingsController implements HandlerBinding {
  public path: string = '/settings';
  public router: Router = Router();
  
  constructor() {
    this.intializeRoutes();
  }
 
  public intializeRoutes() {
    this.router.get(this.path, this.getSettings);
    this.router.post(this.path, this.setSettings);
  }
 
  getSettings = (req: Request, response: Response) => {
    response.send(req.app.get('timerMaster').getCounterMessages());
  }
 
  setSettings = (req: Request, res: Response) => {
    const settings: {
      seconds: string;
      minutes: string;
      hours: string;
    } = req.body;
    req.app.get('timerMaster').setCounterMessages(settings);
    res.send(settings);
  }
}
 
export default SettingsController;