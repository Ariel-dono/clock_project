import { Worker } from "worker_threads";
import process from "process";

// Manage the workers
export class WorkerFactory {
  // master context
  private secondsMessage: string = "tick";
  private minutesMessage: string = "tock";
  private hoursMessage: string = "bong";
  private countSeconds: number = 0;
  private countMinutes: number = 0;
  private countHours: number = 0;

  // job definition
  private runService(workerData: object) {
    return new Promise((resolve, reject) => {
      const worker = new Worker("./src/workers/worker.js", { workerData });
      worker.on("message", resolve);
      worker.on("error", reject);
      worker.on("exit", (code) => {
        if (code !== 0) {
          reject(new Error(`Stopped with the exit code: ${code}`));
        }
      });
    });
  }

  public clockOrchestrator = async () => {
    this.countSeconds++;
    let message = this.secondsMessage;
    if (this.countSeconds == 60) {
      this.countSeconds = 0;
      this.countMinutes++;
      message = this.minutesMessage;
    }
    if (this.countMinutes == 60) {
      this.countMinutes = 0;
      message = this.hoursMessage;
      this.countHours++;
    }
    const result = await this.runService({
      action: message,
      countSeconds: this.countSeconds,
      countMinutes: this.countMinutes,
      countHours: this.countHours,
    });
    console.log(result);

    if (this.countHours == 3) {
      process.exit();
    }

    return result
  }

  public async build() {
    // master thread job scheduling
    setInterval(this.clockOrchestrator, 1000);
  }

  // change master thread settings
  public setCounterMessages(data: {
    seconds: string;
    minutes: string;
    hours: string;
  }) {
    if (this.countMinutes >= 10) {
      this.secondsMessage = data.seconds;
      this.minutesMessage = data.minutes;
      this.hoursMessage = data.hours;
    }
  }

  // change master thread settings
  public setCounter(data: {
    seconds: number;
    minutes: number;
    hours: number;
  }) {
    this.countSeconds = data.seconds;
    this.countMinutes = data.minutes;
    this.countHours = data.hours;
  }

  // get master current thread settings
  public getCounterMessages() {
    return {
      seconds: this.secondsMessage,
      minutes: this.minutesMessage,
      hours: this.hoursMessage,
    };
  }
}
