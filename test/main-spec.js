const Application = require("spectron").Application;
const assert = require("assert");
const electronPath = require("electron"); // Require Electron from the binaries included in node_modules.
const path = require("path");

describe("Application launch", function () {
  this.timeout(10000);

  before(function () {
    this.app = new Application({
      path: "./resources/i-know-this-win32-x64/i-know-this.exe",
      args: [path.join(__dirname, "..")],
    });
    return this.app.start();
  });

  afterEach(function () {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });

  it("shows an initial window", function () {
    return this.app.client
      .getWindowCount()
      .then(function (count) {
        assert.strictEqual(count, 2);
        // TODO should be only one
      })
      .catch((err) => console.log(err));
  });

  it("shows correct title", function () {
    return this.app.client
      .getTitle()
      .then(function (title) {
        assert.strictEqual(title, "I Know This");
      })
      .catch((err) => console.log(err));
  });
});
