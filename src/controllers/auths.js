const jwt = require("jsonwebtoken");
const connectDB = require("../providers/database");

exports.register = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.json({
            status: "fail",
            message: "Missing username or password"
        })
    }

    const user = {
        ...req.body,
        username: username.toLowerCase().trim(),
    }

    const dbo = await connectDB();

    const existingUser = await dbo.collection('users').findOne({
        username: user.username
    });

    if(existingUser) {
        return res.json({
            status: "fail",
            message: "Username already exists"
        })
    }

    const newUser = await dbo.collection('users').insertOne(user);

    return res.json({
        status: "success",
        data: newUser
    })

}

exports.login = async (req, res, next) => {
    const {username, password} = req.body;

    if(!username || !password) {
        return res.json({
            status: "fail",
            message: "Missing username or password"
        })
    }

    const filter = {
        username: username.toLowerCase().trim(),
        password,
    }

    const dbo = await connectDB();

    
    // 
    const user = await dbo.collection('users').findOne(filter, {
        projection: {
            password: 0,
        }
    });

    if(!user) {
        return res.json({
            status: "fail",
            message: "Incorrect username or password"
        })
    }

    // delete user.password;
    // user.password = undefined;

    const token = jwt.sign({ _id: user._id}, "SECRET#2023", {
        expiresIn: "1d"
    })

    user.token = token;

    return res.json({
        status: "success",
        data: user
    });

}