import { User } from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const USER = [];

export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    //Checking whether the user already exists
    const userExists = USER.some((obj) => obj[email] === email);
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User(
      Math.random().toString(),
      fullName,
      email,
      hashedPassword
    );
    const tokenData = {
        userId: newUser.id
    }
    USER.push(newUser);
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn: "2d"})
    return res
      .status(200)
      .cookie("token", token, {maxAge: 1*24*60*60*1000})
      .json({ message: "User created successfully", newUser });
  } catch (error) {
    console.log("Error in signup", error);
  }
};

export const login = async(req, res) => {
    try{
        const {email, password} = req.body
        if(!email || !password){
            return res.status(400).json({message: "All fields are required"})
        }
        const existedUserIndex = USER.findIndex((user) => user.email === email)
        if(existedUserIndex < 0){
            return res.status(404).json({message: "User not found"})
        }
        const isPasswordMatch = await bcrypt.compare(password, USER[existedUserIndex].password)
        if(!isPasswordMatch){
            return res.status(400).json({message: "Invalid credentials"})
        }
        const tokenData = {
        userId: USER[existedUserIndex].id
    }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn:"2d"})
        return res.cookie("token", token, {maxAge:1*24*60*60*1000}).json({
            message:"User Logged In",user: USER[existedUserIndex]
        })
    }catch(error){
        console.log("Error in login", error)
    }
}

export const logout = (req, res) => {
    try{
        return res.status(200).cookie("token", "", {maxAge: 0}).json({message: "User logged out"})
    }catch(error){
        console.log("Error in logout", error)
    }
}