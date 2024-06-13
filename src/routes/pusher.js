const express = require('express');
const router = express.Router();
const {triggerEvent} = require('../controller/pusherNotification')

router.post("/trigger", triggerEvent);


module.exports = router;