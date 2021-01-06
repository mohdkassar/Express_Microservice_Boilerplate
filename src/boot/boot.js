const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { constants, config } = require("../utils");
const allInitializers = require("./initalizers");
const allRouters = require("../routes").mysqlRouter;
const Table = require("cli-table");
const listEndpoints = require("express-list-endpoints");

const app = express();

const registerCoreMiddleWare = function () {
  try {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    console.log(`BOOT :: Registered middleware : bodyParser`);

    app.use(cors());
    app.options("*", cors());
    console.log(`BOOT :: Registered middleware : cors(*)`);
    console.log(`BOOT :: Registering core middleware done`);
  } catch (error) {
    console.log(
      `BOOT :: Error while registering core middleware . Check core middleware : ${JSON.stringify(
        err.message
      )}`
    );
  }
};

// register all routes in routes/index
const registerRoutes = (routers) => {
  try {
    if (Object.keys(routers) && Object.keys(routers).length) {
      console.log(`BOOT :: Registering routes started`);
      Object.keys(routers).forEach((key) => {
        app.use("/", routers[key]);
      });
      // print the routes in console
      console.log(`BOOT :: Registered following routes`);
      const table = new Table({ head: ["", "Path"] });
      listEndpoints(app).forEach((route) => {
        if (route.path != "*") {
          const row = {};
          row[`${route.methods.join(", ")}`] = route.path;
          table.push(row);
        }
      });
      console.log(`\n${table.toString()}`);
      console.log("BOOT :: Registering routes done");
    }
  } catch (err) {
    console.log(
      `BOOT :: Error while registering routes. Check routes : ${JSON.stringify(
        err.message
      )}`
    );
  }
};

// register all initializer in initializers/index
const registerInitializers = (initializers) => {
  try {
    console.log(`BOOT :: Registering initializer started`);
    Object.keys(initializers).forEach((key) => {
      app.use(initializers[key]);
      console.log(`BOOT :: Registered initializer : ${key}`);
    });
    console.log(`BOOT :: Registering initializer done`);
  } catch (err) {
    console.log(
      `BOOT :: Error while registering initializer. Check initializer : ${JSON.stringify(
        err.message
      )}`
    );
  }
};

const handleError = () => {
  process.on("uncaughtException", function (err) {
    console.log(`UNCAUGHT_EXCEPTION OCCURRED : ${JSON.stringify(err.stack)}`);
    process.exit(1);
  });
};

// start application
const startApp = async () => {
  try {
    // register core application level middleware
    registerCoreMiddleWare();
    // register routes
    registerRoutes(allRouters ? allRouters : {});
    // register all the initializer
    registerInitializers(allInitializers ? allInitializers : {});

    app
      .listen(constants.PORT, constants.HOST)
      .on("error", (error) => {
        if (error.syscall !== "listen") {
          throw error;
        }
        // handle specific listen errors with friendly messages
        switch (error.code) {
          case "EACCES":
            console.log(
              `BOOT :: ${constants.HOST}:${constants.PORT} requires elevated privileges`
            );
            process.exit(1);
            break;
          case "EADDRINUSE":
            console.log(
              `BOOT :: ${constants.HOST}:${constants.PORT} is already in use`
            );
            process.exit(1);
            break;
          default:
            throw error;
        }
      })
      .on("listening", () => {
        console.log(
          `BOOT :: <> <> <> <> <> <> <> <> <> <> Listening on ${constants.HOST}:${constants.PORT} <> <> <> <> <> <> <> <> <> <>`
        );
      });

    // exit on uncaught exception
    handleError();
  } catch (err) {
    console.log(
      `BOOT :: Error while booting application from boot script : ${JSON.stringify(
        err
      )}`
    );
    throw err;
  }
};

module.exports = { startApp };
