const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET_ADMIN;
function adminAuth(req, res, next) {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({ message: "Token missing or malformed" });
    }
    try {
        const decodedInfo = jwt.verify(token, JWT_SECRET);
        const id = decodedInfo.id;
        if (id) {
            req.id = decodedInfo.id;
            next();
        }
        else res.status(403).send({ message: "Not authorized user!" });
    } catch (e) {
        res.status(401).json({ message: e });
    }
}
module.exports = adminAuth;