import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';
import User from '../models/user.model.js';

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        console.log(name, email, password)
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = new UserModel({
            name,
            email,
            password: hashPassword,
            role: "user", // Default to 'user' if not provided
        });

        await user.save();

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '90d' }
        );
        res.status(200).json({
            message: 'User registered successfully', user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        });
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        const user = await UserModel.findOne({ email });
        console.log(user)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '90d' }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 90 * 24 * 60 * 60 * 1000, // 30 days
        });
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const createGuestUser = async (req, res) => {
    try {
        // Generate simple unique ID using timestamp + random number
        const timestamp = Date.now();
        const guestEmail = `guest_${timestamp}@taskai.studio`;
        const guestPassword = '785mcs148google4411203@taskai.studio'; // You can randomize this too
        const guestName = `Guest_${timestamp}`;

        // Check if somehow this generated email already exists
        const existingUser = await User.findOne({ email: guestEmail });
        if (existingUser) {
            return res.status(400).json({ message: "Guest user already exists" });
        }

        const hashedPassword = await bcrypt.hash(guestPassword, 10);

        const user = new User({
            name: guestName,
            email: guestEmail,
            password: hashedPassword,
            authProvider: 'guest',
            role: 'guest'
        });

        await user.save();

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
        );
        res.status(201).json({
            message: "Guest user created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        });

    } catch (error) {
        console.error("Error during guest signup:", error);
        res.status(500).json({ message: "Server error during guest signup" });
    }
};
//to couunt the number of users
export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find().select('-password'); // Exclude password field
        res.status(200).json(users.length > 0 ? users.length : { message: "No users found" });
        console.log("All users fetched successfully", users.length);
    }
    catch (error) {
        console.error("Get all users error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


export const addWhatsappSubscriber = async (userID, whatsappNumber) => {


    try {
        const user = await UserModel.findByIdAndUpdate(
            userID,
            { whatsappNumber },
            { new: true }
        );

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    } catch (error) {
        // Optional: Log error or handle specific cases
        throw new Error(`Failed to update WhatsApp number: ${error.message}`);
    }
};

export const removeWhatsappSubscriber = async (number) => {
    try {
        const user = await UserModel.findOneAndUpdate(
            { whatsappNumber: number },
            { whatsappConnected: false, whatsappNumber: null },
            { new: true }
        );

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    } catch (error) {
        // Optional: Log error or handle specific cases
        throw new Error(`Failed to remove WhatsApp subscriber: ${error.message}`);
    }
}