import { checkForUrl } from "../client/js/urlChecker";

describe("Test URL validation method", () => {
  test("it should return false on invalid URL", () => {
    let invalidUrl = "htp/somewrongUrl";
    expect(checkForUrl(invalidUrl)).toBe(false);
  });

  test("it should return true on valid URL", () => {
    let invalidUrl = "http://www.cnn.com";
    expect(checkForUrl(invalidUrl)).toBe(true);
  });
});
