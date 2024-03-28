import { NextFunction, Response, Request } from "express"

const express = require("express")
const fs = require("fs")
const YAML = require("yaml")
const file = fs.readFileSync("./config/swagger.yaml", "utf8")
const swaggerDocument = YAML.parse(file)
const swaggerUi = require("swagger-ui-express")
const dotenv = require("dotenv")

const statusRoute = require("./routes/status")
const peopleRoutes = require("./routes/people")
const skillsRoutes = require("./routes/skills")
const groupRoutes = require("./routes/group")

dotenv.config()
const app = express()
const port = process.env.PORT ?? 8000
const DOMAIN_URL_ENV = process.env.DOMAIN_URL ?? ""

app.use("/skill-tracker", swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }))

app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", DOMAIN_URL_ENV) // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.use(express.json())

app.get("/", statusRoute)
app.use("/people", peopleRoutes)
app.use("/skills", skillsRoutes)
app.use("/groups", groupRoutes)

app.listen(port, () => {
    console.log("Listening on port: " + port)
})

// https://stackoverflow.com/questions/70819537/why-can-anyone-access-my-api-deployed-on-heroku-and-how-do-i-prevent-it
