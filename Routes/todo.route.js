import express from "express"
import { CreateTask, deleteTask, getTask, getTaskById, UpdateTask } from "../Controllers/todo.controller.js"
import isAuthenticated from "../middleware/isAuthenticated.js"
const router = express.Router()
router.post("/createTask", isAuthenticated, CreateTask)
router.put("/updateTodo/:id", isAuthenticated, UpdateTask)
router.get("/getTask", isAuthenticated, getTask)
router.get("/getTask/:id", isAuthenticated, getTaskById)
router.delete("/deleteTask/:id", isAuthenticated,deleteTask)
export default router