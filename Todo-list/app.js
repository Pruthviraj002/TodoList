const mongoose = require("mongoose")
const express = require("express")
const RouteTodo = require("./Route/todoRoute")
const cors = require("cors")
require("dotenv/config")

const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("home")
})
app.use("/api/todo", RouteTodo)
app.listen(process.env.PORT)

async function db() {
    try {
        const res = await mongoose.connect(process.env.DB)
        console.log(res.STATES.connected);

    } catch (error) {
        console.log(error.message);
    }
}

db()