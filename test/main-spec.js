var Application = require("spectron").Application;
var assert = require("assert");

describe("Application launch", function () {
  const app = new Application({
    path: "./resources/i-know-this-win32-x64/i-know-this.exe",
    args: ["headless"],
  });

  process.env.NODE_ENV = "test";

  app
    .start()
    .then(function () {
      // Check if the window is visible
      return app.browserWindow.isVisible();
    })
    .then(function (isVisible) {
      // Verify the window is visible
      assert.strictEqual(isVisible, true);
    })
    .then(function () {
      // Get the window's title
      return app.client.getTitle();
    })
    .then(function (title) {
      // Verify the window's title
      assert.strictEqual(title, "My App");
    })
    .then(function () {
      // Stop the application
      return app.stop();
    })
    .catch(function (error) {
      // Log any failures
      console.error("Test failed", error.message);
    });
});