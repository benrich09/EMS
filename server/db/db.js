import mongoose from "mongoose";

 const connectToDatabase = mongoose.connect('mongodb://localhost:27017/ems',
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })

    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error(" MongoDB connection error:", err));
 export default connectToDatabase