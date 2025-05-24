import jwt, { decode } from "jsonwebtoken"
const isAuthenticated = (req, res, next) => {
    try{
        const token = req.cookies.token
        if(!token){
            return res.status(401).json({
                message: "Token is not provided"
            })
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        if(!decoded){
            return res.status(401).json({message: "Token is invalid"})
        }
        next()
    }catch(error){
        console.log("Error in checking authentication", error)
    }
} 

export default isAuthenticated