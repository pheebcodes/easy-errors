const { makeError, isEasyError } = require("../cjs");

describe("makeError", () => {
  it("should return a function", () => {
    const TestError = makeError("TestError");
    expect(typeof TestError).toBe("function");
  });

  it("should accept a default message parameter", () => {
    const errorName = "TestError";
    const defaultMessage = "hello, world!";
    const TestError = makeError(errorName, defaultMessage);
    const e = TestError();

    expect(e.message).toBe(defaultMessage);
    expect(e.toString()).toBe(`${errorName}: ${defaultMessage}`);
    expect(typeof e).toBe("object");
    expect(e instanceof Error).toBe(true);
  });

  it("should accept a message transformer parameter", () => {
    const errorName = "TestError";
    const messageTransformer = (w, d) => `Hello, ${w}! Today is: ${d}`;
    const TestError = makeError(errorName, messageTransformer);
    const args = ["world", new Date().toString()];
    const e = TestError(...args);
    const expectedMessage = messageTransformer(...args);

    expect(e.message).toBe(expectedMessage);
    expect(e.toString()).toBe(`${errorName}: ${expectedMessage}`);
    expect(typeof e).toBe("object");
    expect(e instanceof Error).toBe(true);
  });
});
