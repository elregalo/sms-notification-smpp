const smpp = require("smpp");
const dotenv = require("dotenv");

dotenv.config();

const session = new smpp.Session({
  host: process.env.SMPP_HOST,
  port: process.env.SMPP_PORT,
});

// bind transceiver
let isConnected = false;
session.on("connect", () => {
  isConnected = true;

  session.bind_transceiver(
    {
      system_id: process.env.SYSTEM_ID,
      password: process.env.PASSWORD,
      interface_version: 1,
      system_type: process.env.SYSTEM_TYPE,
      address_range: process.env.SYSTEM_TYPE,
      addr_ton: 1,
      addr_npi: 1,
    },
    (pdu) => {
      if (pdu.command_status == 0) {
        console.log("Bind Transceiver Success");
      }
    }
  );
});

session.close("close", () => {
  if (isConnected) {
    session.connect();
  }
});

session.on("error", (err) => {
  console.log(err);
  isConnected = false;
});
