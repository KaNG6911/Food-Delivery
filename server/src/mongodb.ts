// import mongoose from "mongoose";

// const connectMongoDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
// };

// export default connectMongoDB;

import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    
    console.log(`✅ MongoDB холбогдлоо: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB холбогдох алдаа:`, error);
    process.exit(1);
  }
};

// MongoDB events
mongoose.connection.on('connected', () => {
  console.log('🔗 Mongoose холбогдсон');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose холбох алдаа:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ Mongoose салсан');
});
