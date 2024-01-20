const express = require('express');
const router = express.Router();

const { 
    getProjects, 
    getProject,
    createProject,
     deleteProject, 
     countProjects, 
    updateProject 
} = require("../controllers/projects")

router.post('/', createProject)
router.get('/', getProjects)

router.get('/count', countProjects)

router.get('/:id', getProject)

router.patch('/:id', updateProject)
router.delete('/:id', deleteProject)


module.exports = router