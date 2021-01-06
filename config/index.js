const devConfig = require("./dev/index");

const getConfigFiles = (environment) => {
  return devConfig;
};

module.exports = {
  getConfigFiles,
};
