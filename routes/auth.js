import { Router } from "express";
import User from "../models/user.js"; // Rename to `User` (best practice)
import * as yup from "yup";
import Review from '../models/review.js'
export const userSchema = yup.object({
    firebaseUID: yup.string().required("Firebase UID is required"),
    dateOfBirth: yup.date().required("Date of Birth is required"),
    age: yup.number().positive().integer().required("Age is required"),
    bloodGroup: yup.string().oneOf(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], "Invalid blood group").required(),
    nationality: yup.string().required("Nationality is required"),
    gender: yup.string().oneOf(["Male", "Female"], "Invalid gender").required(),
    hobbies: yup.string(),
    nickName: yup.string(),
    birthPlace: yup.string(),
    spouse: yup.string().oneOf(["Single", "Married"], "Invalid spouse status").required(),
    school: yup.string(),
    college: yup.string(),
    university: yup.string(),
    occupations: yup.string(),
    formerJob: yup.string(),
    phone: yup.string(),
    email: yup.string().email("Invalid email format").required("Email is required"),
    address: yup.string(),
    userName:yup.string().required("User Name is required")
});

const AuthRouter = Router();

AuthRouter.get('/auth', (req, res) => {
    res.send('Auth Route');
});

AuthRouter.get('/user/:id', async (req, res) => {
    try {
        console.log(req.params.id, ' id');
 
        const foundUser = await User.findOne({firebaseUID:req.params.id}).populate('reviewIds');  
        if (!foundUser) return res.status(404).send('User not found');
        const reviews = await Review.find({ userId:foundUser._id }).populate('reviewerId')
       res.json({foundUser,reviews});  
    } catch (error) {
        console.error(error);  
        res.status(500).send('Server Error');
    }
});
AuthRouter.post('/user', async (req, res) => { 
    try {
       
        await userSchema.validate(req.body, { abortEarly: false });

        const { userName } = req.body;

      
        const existingUser = await User.findOne({ userName });

        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }

       
        const newUser = new User(req.body);
        await newUser.save();

        res.status(201).json(newUser);  
    } catch (error) {
        console.error(error);

       
        if (error.name === "ValidationError") {
            return res.status(400).json({ errors: error.errors });
        }

        res.status(500).send("Server Error");
    }   
});

export default AuthRouter;
