const express = require('express');
const app = express(); // new instance
app.use(express.json());
const PORT = 5000;


const authsRouter = require("./src/routes/auths");
const projectsRouter = require("./src/routes/projects");
const guard = require('./src/utils/guard');

app.use("/auth", authsRouter)

app.use(guard)

app.use("/projects", projectsRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});