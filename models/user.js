import mongoose from "mongoose";
import { array, string } from "yup";

const UserSchema = new mongoose.Schema(
  {
    firebaseUID: { type: String, required: true, unique: true },  
    dateOfBirth: { type: Date, required: true },
    age: { type: Number, required: true },
    bloodGroup: { type: String, enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], required: true },
    nationality: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    hobbies: { type: [String],default:''},
    nickName: { type: String,default:'' },
    birthPlace: { type: String },
    spouse: { type: String, enum: ["Single", "Married"], required: true },
    school: { type: String,default:''},
    college: { type: String,default:'' },
    university: { type: String },
    occupations: { type: [String] ,default:''},
    formerJob: { type: String,default:'' },
    phone: { type: String,default:'' },
    email: { type: String, required: true, unique: true },
    address: { type: String ,default:''},
    userName:{type:String,require:true},
    about:{type:String,require:true},
    review: { type: mongoose.Schema.Types.ObjectId, ref: "Review" },
    profileImage: { type: String },  

    
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
