const keys = require("./keys")

const express = require("express")
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json())

// pg db connection
const { Pool } = require("pg")
const pgClient = new Pool({
   user: keys.pgUser,
   host: keys.pgHOST,
   database: keys.pgDATABASE,
   password: keys.pgPASSWORD,
   port: keys.pgPORT
})

pgClient.on("connect", client => {
   client.query("CREATE TABLE IF NOT EXISTS values (number INT)")
      .catch(error => console.log("DB Error", error))
})

app.get("/", (req, res) => {
   res.send("Hello!")
})

app.get("/values/all", async (req, res) => {
   const values = await pgClient.query("SELECT * FROM values");
   res.send(values)
})

app.post("/values", async (req, res) => {
   if (!req.body.value) res.send({ working: false })

   pgClient.query("INSERT INTO values(number) VALUES($1)", [req.body.value])
   res.send({ working: true })
})

app.listen(5000, (error) => {
   console.log("listening to port 5000");
})
