const { ObjectId } = require('mongodb');
const connectDB = require('../providers/database')

exports.getProjects = async (req, res, next) => {
    const dbo = await connectDB();
    const projects = await dbo.collection("projects").find({}).toArray();
    
    return res.json({
        status: "success",
        data: projects
    })
}

exports.getProject = async (req, res, next) => {

    const { id } = req.params;

    const dbo = await connectDB();

    const project = await dbo.collection('projects').findOne({
        _id: new ObjectId(id)
    });

    return res.json({
        status: "success",
        data: project
    })
}

exports.createProject = async (req, res, next) => {
    const dbo = await connectDB();

    const result = await dbo.collection('projects').insertOne(req.body);
    return res.json({
        status: "success",
        data: result
    })
}

exports.updateProject = (req, res, next) => {
    return res.json({
        message: "Update Project Controller is working fine!"
    })
}

exports.deleteProject = (req, res, next) => {
    return res.json({
        message: "Delete Project Controller is working fine!"
    })
}

exports.countProjects = (req, res, next) => {
    return res.json({
        message: "Count Total Projects Controller is working fine!"
    })
}

