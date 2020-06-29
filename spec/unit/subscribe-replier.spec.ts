import { subscribers } from "../../src/lib/constants";
import { subscribeReplier } from "../../src/lib/subscribe-replier";

describe("subscribeReplier", function () {
  it("should return UUID of reply event", function () {
    const actual = subscribeReplier(jest.fn(), "*");

    expect(actual).toMatch(/^\w{8}-\w{4}-4\w{3}-\w{4}-\w{12}$/);
  });

  it("should subscribe function to returned event", function () {
    const origin = "http://example.com";
    const event = subscribeReplier(jest.fn(), origin);

    expect(subscribers[origin][event][0]).toBeInstanceOf(Function);
  });

  it("should unsubscribe function when reply invoked", function () {
    const origin = "http://example.com";
    const event = subscribeReplier(jest.fn(), origin);

    expect(subscribers[origin][event][0]).toBeInstanceOf(Function);

    subscribers[origin][event][0]();

    expect(subscribers[origin][event][0]).not.toBeDefined();
  });
});
