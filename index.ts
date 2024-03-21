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

app.get('/', statusRoute);
app.use('/people', peopleRoutes);
app.use('/skills', skillsRoutes);

app.listen(port, () => {
    console.log('Listening on port: ' + port);
});
