const express = require("express")
const redis = require("redis")

const app = express();
const redisClient = redis.createClient();
app.use(express.json())



app.get("/", (req, res) => {
    res.status(200).json({
        "ok": true,
        "message": "express server is running"
    })
    console.log(redisClient)
})


app.listen(8080, async () => {
    console.log("server is running")
    await redisClient.connect()
})