import "@testing-library/jest-dom";
import { setupServer } from "msw/node";
import { handlers } from "./server-handlers";

const server = setupServer(...handlers);

// Establish API mocking before all tests.
beforeAll(async () => {
  await server.listen();
});
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(async () => {
  await server.resetHandlers();
});
// Clean up after the tests are finished.
afterAll(async () => {
  await server.close();
});
