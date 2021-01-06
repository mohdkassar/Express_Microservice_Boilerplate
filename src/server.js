const startApp = require("./boot").startApp;
const { constants, config } = require("./utils");

(async () => {
  try {
    await startApp();
    console.log(`BOOT :: Application booted successfully!!`);
  } catch (err) {
    console.log(
      `BOOT :: Error while booting application from sever.js : ${JSON.stringify(
        err.message
      )}`
    );
  }
})();
