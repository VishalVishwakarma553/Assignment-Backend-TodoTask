import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import userRoutes from "./Routes/user.route.js"
import todoRoutes from "./Routes/todo.route.js"
dotenv.config()
const app = express()
app.use(express.json())
app.use(cookieParser())


app.get("/", (req, res) => {
    res.send({
        message: "Server is running"
    })
})

//Api middleware
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/todo", todoRoutes)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
