const { config, Connections, constants, mysql } = require("../../utils");

const init = async function () {
  try {
    console.log(
      `BOOT :: Connecting Mongo at : ${JSON.stringify(
        config.databases.mysql.host
      )}`
    );
    const mysqlClient = await mysql.default.initialize({
      host: config.default.databases.mysql.host,
      user: config.default.databases.mysql.user,
      password: config.default.databases.mysql.password,
      database: config.default.databases.mysql.database,
      multipleStatements: true,
    });

    Connections.set(constants.CONNECTIONS.MYSQL, mysqlClient);
    console.log(
      `BOOT :: Connected MySQL at : ${JSON.stringify(
        config.default.databases.mysql.host
      )}, DB: ${config.default.databases.mysql.database}`
    );
  } catch (err) {
    console.log(
      `BOOT :: Error connecting to MySQL server at ${config.databases.mysql.host} :: message: ${err.message} :: stack : ${err.stack}`
    );
    throw new Error(err.message);
  }
};

module.exports = init;
