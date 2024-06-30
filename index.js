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

app.get("/set", async (req, res) => {
    try {
        //const response = await redisClient.set("name", JSON.stringify("mugdho"), 'EX', 60);
        redisClient.set(`name`, JSON.stringify("mugdho"), { EX: 20 })
        return res.status(200).json({
            "ok": true,
            "message": "cached"
        })
    } catch (error) {
        console.log(error)
    }
})


app.get("/get", async (req, res) => {
    try {
        let data;
        const d = await redisClient.get("name")
        console.log(d)
        return res.status(200).json({
            "ok": true,
            "data": data
        })
    } catch (error) {
        console.log(error)
    }
})

app.get("/delete", async (req, res) => {
    try {
        let data;
        const d = await redisClient.del("name")
        console.log(d)
        return res.status(200).json({
            "ok": true,
            "data": data
        })
    } catch (error) {
        console.log(error)
    }
})

app.listen(8080, async () => {
    console.log("server is running")
    try {
        await redisClient.connect();
        console.log("connected to redis server")
    } catch (error) {
        console.log(error.errors[0].message)
    }
})