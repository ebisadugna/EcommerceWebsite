import mongoose from "mongoose";

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }
      console.log("MongoDB connected successfully before cache")


  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    }
    cached.promise = mongoose.connect(`${process.env.MONGODB_URI}`, opts).then((mongoose) => {
      return mongoose
    })
    console.log("MongoDB connected successfully")
  }
  cached.conn = await cached.promise
  return cached.conn
  
}


export default connectDB