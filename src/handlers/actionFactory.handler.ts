import { Express } from "express";
import bodyParser from "body-parser";
import { HandlerBinding } from "./action.interface";
import { WorkerFactory } from "../workers/factory";

// REST APIs factory by feature
class ActionFactory {
  public app: Express;
  public port: number;

  constructor(app: Express, controllers: HandlerBinding[], port: number) {
    this.app = app;
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }

  private initializeControllers(controllers: HandlerBinding[]) {
    controllers.forEach((controller: HandlerBinding) => {
      this.app.use(controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      let factory = new WorkerFactory();
      factory.build();
      this.app.set("timerMaster", factory);

      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default ActionFactory;
