const { Pool } = require("pg")
const dotenv = require("dotenv")

dotenv.config()

const client = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: {
        require: true,
        rejectUnauthorized: false,
    },
})

export const runQuery = async <T>(query: string, params: Array<any> = []): Promise<T> => {
    // console.log({ query, params })
    try {
        const { rows } = await client.query(query, params)
        return rows
    } catch (error) {
        // console.log(error)
        throw Error("SQL ERROR: " + error)
    }
}
