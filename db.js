const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

    
const Schema = mongoose.Schema;
const ObjectID = mongoose.Types.ObjectId;

const users = new Schema({
    firstname: String,
    lastname: String,
    email: {type:String, unique:true},
    pass: String
})

const admin = new Schema({
    adminid: ObjectID,
    email: {type:String, unique:true},
    pass: String,
    firstname: String,
    lastname: String
})

const courses = new Schema({
    courseid: ObjectID,
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorid: ObjectID
})

const purchases = new Schema({
    id: ObjectID,
    courseid: ObjectID,
    userid: ObjectID
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