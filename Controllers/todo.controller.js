import { Todo } from "../Models/todo.model.js"

let TODO = []

export const CreateTask = (req, res) => {
    try{
        const {task, description} = req.body
        if(!task || !description){
            return res.status(400).json({message: "All fields are required"})
        }
        const newTodo = new Todo(Math.random().toString(), task, description)
        TODO.push(newTodo)
        return res.status(200).json({
            message: "Todo created successfully",
            newTodo
        })
    }catch(error){
        console.log("Error in createTodo", error)
    }
}

//Update task
export const UpdateTask = (req, res) => {
    try{
        const taskId = req.params.id
        const {task, description} = req.body
        const todoIndex = TODO.findIndex((todo) => todo.id === taskId)
        if(todoIndex < 0){
            return res.status(404).json({message: "Todo not exist"})
        }
        if(task){
            TODO[todoIndex].task = task
        }
        if(description){
            TODO[todoIndex].description = description
        }
        return res.status(200).json({message:"Todo Updated Successfully", updatedTodo: TODO[todoIndex]})
    }catch(error){
        console.log(error)
    }
}

//Get task
export const getTask = (req, res) => {
    try{
        return res.status(200).json({message:"The list of created tasks", TODO})
    }catch(error){
        console.log(error)
    }
}

//Get task by id
export const getTaskById = (req, res) => {
    try{
        const taskId = req.params.id
        const todoIndex = TODO.findIndex((todo) => todo.id === taskId)
        if(todoIndex < 0){
            return res.status(404).json({message: "task does not exist"})
        }
        return res.status(200).json({message: "requested task", task:TODO[todoIndex]})
    }catch(error){
        console.log("Error in getting the task", error)
    }
}

// Delete a task by ID
export const deleteTask = (req, res) => {
    try{
        const taskId = req.params.id
        const updatedTasks = TODO.filter((todo) => todo.id !== taskId)
        if(updatedTasks.length == TODO.length){
            return res.status(400).json({message: "The task my not be exist with the given ID"})
        }
        TODO = updatedTasks
        return res.status(200).json({message: "Task deleted successfully", TODO})
    }catch(error){
        console.log("Error in delete task", error)
    }
}
