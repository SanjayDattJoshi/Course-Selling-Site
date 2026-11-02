const express = require("express");
const app = express();
const cors = require("cors");

const {userRouter} = require("./routes/user.js");
const {courseRouter} = require("./routes/course.js");
const {adminRouter} = require("./routes/admin.js");

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin",adminRouter);

app.listen("3000", ()=>{
    console.log("Server running on port 3000....");
})