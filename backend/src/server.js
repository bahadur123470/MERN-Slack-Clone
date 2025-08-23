import express from "express"
import { ENV } from "./config/env.js"


const app = express()

app.get("/", (req,res) => {
    res.send("Hello world!")
})
console.log("Mongo URI:", ENV.MONGO_URI)
console.log("NODE_ENV:", ENV.NODE_ENV)
app.listen(ENV.PORT, () => {
    console.log(`Server is listening on port => http://localhost:${ENV.PORT}/ `)
})