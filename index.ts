import express, { Express, Request, Response } from 'express';

const fs = require("fs")
const YAML = require('yaml')
const file = fs.readFileSync('./config/swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)
const swaggerUi = require("swagger-ui-express");

const app: Express = express();
const port = 8000;

app.use(
    "/skill-tracker",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, { explorer: true })
);

app.get('/', (req: Request, res: Response) => res.send('Hello World'));

app.get('/people', (req: Request, res: Response) => res.send('Hello World'));

app.get('/people/:id', (req: Request, res: Response) => res.send('Hello World'));

app.get('/skills', (req: Request, res: Response) => res.send('Hello World'));

app.listen(port, () => {
    console.log('Listening on port ' + port);
});
