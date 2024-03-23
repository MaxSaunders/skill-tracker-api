const express = require('express');
const fs = require("fs")
const YAML = require('yaml')
const file = fs.readFileSync('./config/swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)
const swaggerUi = require("swagger-ui-express");
const dotenv = require('dotenv');

const statusRoute = require('./routes/status')
const peopleRoutes = require('./routes/people')
const skillsRoutes = require('./routes/skills')

dotenv.config();
const app = express();
const port = process.env.PORT ?? 8000;

app.use(
    "/skill-tracker",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, { explorer: true })
);
app.use(express.json())

app.get('/', statusRoute);
app.use('/people', peopleRoutes);
app.use('/skills', skillsRoutes);

app.listen(port, () => {
    console.log('Listening on port: ' + port);
});

// https://stackoverflow.com/questions/70819537/why-can-anyone-access-my-api-deployed-on-heroku-and-how-do-i-prevent-it