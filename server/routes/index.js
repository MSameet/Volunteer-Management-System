const router = require("express").Router();
const userRouter = require("./user");
const eventRouter = require("./event");
const requestRouter = require("./request");
const organizerRouter = require("./organizer");

router.use("/user", userRouter);

router.use("/event", eventRouter);

router.use("/request", requestRouter);

router.use("/organiser", organizerRouter);

module.exports = router;
