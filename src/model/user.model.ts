import mongoose from 'mongoose';
// import {HookNextFunction} from "@types/mongoose"
import bcrypt from 'bcrypt';

export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  role:string,
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema({
  email: { type: String, require: true, unique: true },
  name: { type: String, require: true },
  password: { type: String, require: true },
  role: {
    type: String,
    default: 'user',
    enum: ['admin', 'user']
  }
});

UserSchema.pre('save', async function (next) {
  const user = this as UserDocument;

  if (!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  const hash: string = bcrypt.hashSync(user.password, salt);

  user.password = hash;
  return next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as UserDocument;
  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const User = mongoose.model<UserDocument>('User', UserSchema);

export default User;
