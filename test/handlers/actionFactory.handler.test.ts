import ActionFactory from "../../src/handlers/actionFactory.handler";
import SettingsController from "../../src/handlers/settings.handler";
import { Express } from "express";

jest.mock("../../src/workers/factory", () => ({
  ...jest.requireActual("../../src/workers/factory"),
  build: jest.fn(),
}));

describe("Testing action handlers factory", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  it("Building the rest api", async () => {
    const mockedExpress = {
      use: jest.fn(),
      listen: jest.fn()
    }
    const app = new ActionFactory(
      mockedExpress as object as Express,
      [new SettingsController()],
      5000
    );
    app.listen();
  });
});
