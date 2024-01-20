const jwt = require('jsonwebtoken')

const guard = async (req, res, next) => {
    const { authorization } = req.headers;
    
    if(!authorization) {
        return res.json({
            status: "fail",
            message: "Missing authorization"
        })
    }

    const token = authorization.split(" ")[1];

    const payload = jwt.verify(token, "SECRET#2023");

    if(!payload) {
        return res.json({ status: "fail", message: "Invalid token" });
    }
    
    next();
}

module.exports = guard;