import mongoose from 'mongoose';
import config from '../configs/index.config';

function connectDB() {
  const dbUrl = config.dbUriCloud as string;

  return mongoose.connect(dbUrl, {}).then(()=>{
    console.log("database connected")
  }).catch((error)=>{
    console.log(error)
    process.exit(1)
  })
}

export default connectDB