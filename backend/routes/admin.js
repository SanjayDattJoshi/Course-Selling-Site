const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const mongoose = require("mongoose");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const {Router} = require("express");
const adminRouter = Router();


const { UserModel, CourseModel } = require("../db");


authRouter.post("/signup", async function (req, res) {
    const requireBody = z.object({
        firstname: z.string().min(3).max(100),
        lastname: z.string().min(3).max(100),
        email: z.string().min(5).max(100).email(),
        pass: z.string().min(6)
    })

    const parseDataWithSuccess = requireBody.safeParse(req.body);
    if (!parseDataWithSuccess.success) {
        res.status(400).json({
            message: "Incorrect Format",
            error: parseDataWithSuccess.error
        })
        return
    }

    const { firstname,lastname,email, pass } = req.body;

    try {
        const hashedPass = await bcrypt.hash(pass, 10);

        const user = await UserModel.findOne({
            email: email
        })
        if (user) return res.status(409).json({ message: "Email Already Exists" });

        await UserModel.insertOne({
            firstname: firstname,
            lastname: lastname,
            email: email,
            pass: hashedPass
        })
        res.json({ message: "User Created" });
    } catch (e) {
        res.json({ message: "Sign-Up request failed..." + e })
    }

})

authRouter.post("/login", async function (req, res) {
    const requireBody = z.object({
        email: z.string().min(5).max(100).email(),
        pass: z.string().min(6)
    })

    const parseDataWithSuccess = requireBody.safeParse(req.body);
    if (!parseDataWithSuccess.success) {
        res.status(400).json({
            message: "Incorrect Format",
            error: parseDataWithSuccess.error
        })
        return
    }

    const { email, pass } = req.body;

    try {
        const user = await UserModel.findOne({
            email: email,
        })

        if (!user) return res.status(401).json({ message: "Sign up first" });

        const passMatch = await bcrypt.compare(pass, user.pass);

        if (user && passMatch) {
            const token = jwt.sign(
                {
                    id: user._id
                },
                JWT_SECRET,
                { expiresIn: "7d" }
            );
            res.json({ token: token });
        }
        else {
            res.status(403).json({ message: "Wrong Credentials..." });
        }
    } catch (e) {
        res.status(500).json({ message: e });
    }
})

adminRouter.use(adminMiddleware);

adminRouter.post("/course", async function(req,res){
    const adminID = req.userId;

    const {title,description,price,imageurl,creatorId} = req.body;

    const course = await courseModel.create({
        title,
        description,
        price,
        imageurl,
        creatorId
    })
})

adminRouter.put("/course", (req,res)=>{
    res.json({message:"Update courese"});
})

adminRouter.get("/course",(req,res)=>{ 
    res.json({message:"your courses"});
})

adminRouter.delete("/course", (req,res)=>{
    res.json({message:"delete course"});
})
module.exports={
    adminRouter: adminRouter
}