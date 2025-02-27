import { Router } from "express";
import User from "../models/user.js";  
import multer from "multer";
import express from 'express';
import path from 'path'
 
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
import { fileURLToPath } from 'url';
const userRouter=Router();
 
 


 userRouter.get('/user',(req,res)=>{
    res.send('User Route');
});
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); 
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  const upload = multer({ storage });
 

 

 

 
const __variableOfChoice = path.resolve(); 
const uploadsPath = path.join(__variableOfChoice, 'uploads');

 
userRouter.use('/uploads', express.static(uploadsPath));
userRouter.put("/update-about/:userId", async (req, res) => {
    try { 
      const { about } = req.body;
      console.log(req.params.userId,':req.params.userId')
      const updatedUser = await User.findOneAndUpdate({
         firebaseUID:req.params.userId,
        },
         { about },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "About section updated", user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });
  

userRouter.put("/update-user-info/:userId", async (req, res) => {
    try {
     
      const { nickName,formerJob, birthPlace, dateOfBirth, gender, bloodGroup, spouse, nationality, hobbies, occupations, school, college, university,address } = req.body;
   console.log(req.body,'addressaddressaddressaddress')
      const updateFields = {
        nickName,
        birthPlace,
        dateOfBirth,
        gender,
        bloodGroup,
        spouse,
        nationality,
        hobbies: hobbies &&hobbies?.length>1? hobbies?.split(",") : hobbies,
        occupations: occupations &&occupations?.length>1? occupations?.split(",") : occupations,
        school,
        college,
        university,
        formerJob,
        address
      };
  
      const updatedUser = await User.findOneAndUpdate(
        { firebaseUID: req.params.userId },
        updateFields,
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "User info updated", user: updatedUser });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Server error", error });
    }
  });
  

  userRouter.post("/upload-profile-image/:userId", upload.single("image"), async (req, res) => {
    try {
      console.log("File Uploaded:", req.file);
      console.log("Request Body:", req.body);
  
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
  
  
      const updatedUser = await User.findOneAndUpdate(
        { firebaseUID: req.params.userId },
        { profileImage: req.file.path },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
 
      res.status(200).json({
        message: "Profile image updated successfully",
        user: {
          firebaseUID: updatedUser.firebaseUid,
          profileImage: updatedUser.profileImage,  
        },
        filePath: req.file.path,  
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Server error", error });
    }
  });
  
export default userRouter;  