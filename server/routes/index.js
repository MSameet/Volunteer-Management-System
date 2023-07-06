const router = require("express").Router();
const userRouter = require("./user");
const eventRouter = require("./event");
const requestRouter = require("./request");

router.use("/user", userRouter);

router.use("/event", eventRouter);

router.use("/request", requestRouter);

module.exports = router;
