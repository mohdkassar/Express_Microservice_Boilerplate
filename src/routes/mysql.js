const express = require("express");
const controller = require("../controllers");

const router = express.Router();

router.get("/v1/vendors", controller.mysqlController);

module.exports = { router };
