const mysqlClass = require("./src/mysql").default;

const initialize = async (config) => {
  try {
    const mysqlDriver = new mysqlClass(config);
    await mysqlDriver.initializeDriver();
    return mysqlDriver.getMySQLInstance();
  } catch (error) {
    console.log(
      `MONGO_CONNECTOR :: Error connecting to Mongo ${JSON.stringify(
        error.message
      )}`
    );
  }
};

module.exports = {
  initialize,
};
