const express = require("express");
const app = express();
const cors = require("cors");

const {authRouter} = require("./routes/auth.js");
const {courseRouter} = require("./routes/course.js");

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/course", courseRouter);

app.listen("3000", ()=>{
    console.log("Server running on port 3000....");
})