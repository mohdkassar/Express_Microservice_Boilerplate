const mysql = require("mysql");
const EventEmitter = require("events");
const constants = require("./utils/constants");

module.exports = class MySQL extends (
  EventEmitter
) {
  constructor(config) {
    this.connection;
    super();

    const connectionConfig = {
      host: config.host,
      user: config.user,
      password: config.password,
      database: config.database,
      multipleStatements: true,
    };

    this.connection = mysql
      .createConnection(connectionConfig)
      .connect((err) => {
        if (err) {
          this.emit(
            constants.default.EventEnums.CONNECTION_END.toString(),
            this.connection
          );
        } else {
          this.emit(
            constants.default.EventEnums.CONNECTION_SUCCESS.toString(),
            this.connection
          );
        }
      });
  }

  initializeDriver() {
    const _this = this;
    return new Promise((resolve, reject) => {
      this.connection.on("open", function () {
        console.log(
          `MONGO_CONNECTOR :: Successfully connected to MongoDB database ${config.host}`
        );
        _this.emit(
          constants.EventEnums.CONNECTION_SUCCESS.toString(),
          _this.connection
        );
        resolve();
      });

      this.connection.on("error", function (error) {
        console.log(
          `MONGO_CONNECTOR :: There was an error in mongodb ${error}`
        );
        _this.emit(
          constants.default.EventEnums.CONNECTION_ERROR.toString(),
          error
        );
      });
      _this.connection.on("disconnected", function (error) {
        console.log(
          `MONGO_CONNECTOR :: There was an disconnected in mongodb ${error}`
        );
        _this.emit(
          constants.default.EventEnums.CONNECTION_END.toString(),
          error
        );
      });
    });
  }

  getMySQLInstance() {
    return this.connection;
  }
};
