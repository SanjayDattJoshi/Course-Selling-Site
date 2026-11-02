const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

    
const Schema = mongoose.Schema;
const ObjectID = mongoose.Schema.Types.ObjectId;

const users = new Schema({
    firstname: String,
    lastname: String,
    email: {type:String, unique:true},
    pass: String
})

const admin = new Schema({
    email: {type:String, unique:true},
    pass: String,
    firstname: String,
    lastname: String
})

const courses = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorid: {
        type: ObjectID,
        ref: "Admin"
    }
})

const purchases = new Schema({
    courseid: {
        type: ObjectID,
        ref: "Course"
    },
    userid: {
        type : ObjectID,
        ref: "User"
    }
})

const UserModel = mongoose.model('User', users, 'users');
const CourseModel = mongoose.model('Course', courses, 'courses');
const AdminModel = mongoose.model('Admin', admin, 'admin');
const PurchasesModel = mongoose.model('Purchases', purchases, 'purchases');

module.exports={
    UserModel : UserModel,
    CourseModel: CourseModel,
    PurchasesModel:PurchasesModel,
    AdminModel: AdminModel
}