const { Response, statusCode } = require("../utils");

const Models = require("../models");

const mysqlController = async (req, res) => {
  const allVendors = await Models.Vendors.findById(req.id);

  res.status(statusCode.OK_200).send(
    Response.success(allVendors, {
      link: "http://localhost:8080/v1/mongo_demo",
    })
  );
};

module.exports = { mysqlController };
