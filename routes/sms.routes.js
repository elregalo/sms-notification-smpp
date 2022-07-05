import express from "express";
import { session } from "../service/sms.service.js";

const router = express.Router();

router.post("/sms", (req, res) => {
  const { fromMobile, toMobile, message } = req.body;

  if (!fromMobile || !toMobile || !message) {
    return res.status(400).send("All field are required.");
  }

  session.submit_sm(
    {
      source_addr: fromMobile,
      destination_addr: toMobile,
      short_message: message,
    },
    (pdu) => {
      if (pdu.command_status == 0) {
        res.status(200).send("Message sent successfully.");
      }
      return res.status(500).send("Message sending failed.");
    }
  );
});

export { router as smsRouter };
