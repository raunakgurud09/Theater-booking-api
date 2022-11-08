import mongoose from 'mongoose';
// import {HookNextFunction} from "@types/mongoose"
import bcrypt from "bcrypt";

export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema({
  email: { type: String, require: true, unique: true },
  name: { type: String, require: true },
  password: { type: String, require: true }
});

UserSchema.pre("save",async function(next){
    let user = this as UserDocument

    if(!user.isModified("password")) return next()

    const salt = await bcrypt.genSalt(10)
    const hash:string = bcrypt.hashSync(user.password,salt)

    user.password = hash
    return next()
})

const User = mongoose.model<UserDocument>("User",UserSchema)

export default User