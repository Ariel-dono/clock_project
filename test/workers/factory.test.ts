import { WorkerFactory } from "../../src/workers/factory";

describe("Testing clock multiprocessing capabilities", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  it("testing the job scheduling 00:00:00", async () => {
    let factory = new WorkerFactory();
    const expected = {
      message: {
        action: "tick",
        countHours: 0,
        countMinutes: 0,
        countSeconds: 1,
      },
      status: "Done",
      workerId: 1,
    };
    const result = await factory.clockOrchestrator();
    expect(result).toMatchObject(expected);
  });
  it("testing the job scheduling 00:01:00", async () => {
    let factory = new WorkerFactory();
    const expected = {
      message: {
        action: "tock",
        countHours: 0,
        countMinutes: 1,
        countSeconds: 0,
      },
      status: "Done",
      workerId: 2,
    };
    factory.setCounter({seconds: 59, minutes: 0, hours: 0})
    const result = await factory.clockOrchestrator();
    expect(result).toMatchObject(expected);
  });

  it("testing the job scheduling 01:00:00", async () => {
    let factory = new WorkerFactory();
    const expected = {
      message: {
        action: "bong",
        countHours: 1,
        countMinutes: 0,
        countSeconds: 0,
      },
      status: "Done",
      workerId: 3,
    };
    factory.setCounter({seconds: 59, minutes: 59, hours: 0})
    const result = await factory.clockOrchestrator();
    expect(result).toMatchObject(expected);
  });

  it("testing to change the messages before 00:10:00", async () => {
    let factory = new WorkerFactory();
    const expected = {
      message: {
        action: "quack",
        countHours: 0,
        countMinutes: 11,
        countSeconds: 0,
      },
      status: "Done",
      workerId: 4,
    };
    factory.setCounter({seconds: 59, minutes: 10, hours: 0})
    factory.setCounterMessages({seconds: 'bong', minutes: 'quack', hours: 'tock'})

    const result = await factory.clockOrchestrator();
    expect(result).toMatchObject(expected);
  });
});
