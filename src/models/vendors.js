const { Connections, constants, config } = require("../utils");

// module.exports = class Vendors{

// }
// constructor
const Vendor = function (vendor) {
  this.FullName = vendor.FullName;
  this.BusinessName = vendor.BusinessName;
  this.BusinessDescription = vendor.BusinessDescription;
  this.PhoneNumb = vendor.PhoneNumb;
  this.Email = vendor.Email;
  this.Password = vendor.Password;
  this.Address = vendor.Address;
  this.Vendors_Longit = vendor.Vendors_Longit;
  this.Vendors_Latti = vendor.Vendors_Latti;
};
//const mysqlconnection = Connections.get(constants.CONNECTIONS.MYSQL);

Vendor.create = (newVendor, result) => {
  mysqlconnection.query("INSERT INTO Vendors SET ?", newVendor, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created vendor: ", { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newCustomer });
  });
};

Vendor.findById = (vendorId, result) => {
  mysqlconnection.query(
    `SELECT * FROM Vendor WHERE idVendors = ${vendorId}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found vendor: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Customer with the id
      result({ kind: "not_found" }, null);
    }
  );
};

module.exports = Vendor;
