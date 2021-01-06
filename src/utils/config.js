const appConfig = require("../../config");
const constants = require("./constants");

const config = appConfig.getConfigFiles(constants.ENV);

module.exports = { config };
