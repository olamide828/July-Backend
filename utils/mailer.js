const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth:{
    user: "adegboyega00001@gmail.com",
    pass: "oyvz slee kors oqbt"
  }
});


module.exports = transport;