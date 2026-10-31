const {Router} = require("express");
const courseRouter = Router();
const auth = require("../../middleware/auth");

courseRouter.get("/", auth, (req, res) => {
    res.send("Courses");
})

module.exports={
    courseRouter: courseRouter
}
