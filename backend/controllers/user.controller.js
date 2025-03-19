import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookies from 'cookies'


import UserModel from '../models/user.model.js'



export const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    console.log(name, email, password, role);

    // Add await here
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        // Add return here to stop execution
        return res.status(400).json({ message: "user already exists" });
    }

    // Add await here
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
        name,
        email,
        // Use password field rather than hashPassword unless your schema specifically uses hashPassword
        password: hashPassword,
        role // Adding role field which was in the request but not used
    });

    await user.save();
    res.status(200).json({ message: 'User registered Successfully' });
}
export const loginUser = async (req, res) => {
    const { name, email } = req.body;
    const user = await UserModel.findOne({ email })
    if (!user) {
        res.status(404).json({ message: "User not found" })
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
        res.status(401).json({ message: "Password incorrect" })
    }
    const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: 30 * 24 * 60 * 60 } //one month expiration
    )
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 30 * 24 * 60 * 60 * 1000,
        domain: ''
    })
    res.status(200).json({ message: 'Hello from login user' });
}
export const logoutUser = async (req, res) => {
    res.status(200).json({ message: 'Hello from logout user' });
}
