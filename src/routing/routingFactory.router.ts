import express, {Express} from 'express';
import bodyParser from 'body-parser';
import { RoutingBinding } from '../routing/router.interface'

class RoutingFactory {
  public app: Express;
  public port: number;
 
  constructor(controllers: RoutingBinding[], port: number) {
    this.app = express();
    this.port = port;
 
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }
 
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }
 
  private initializeControllers(controllers: RoutingBinding[]) {
    controllers.forEach((controller: RoutingBinding) => {
      this.app.use('/v1', controller.router);
    });
  }
 
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default RoutingFactory;