import mongoose, { ConnectOptions } from "mongoose";


export async function connectDB (){
    try {
       const conn = await mongoose.connect(process.env.MONGO_URI as string, {
        useNewUrlParser: true,
        autoIndex: true,
        useUnifiedTopology: true,
                } as ConnectOptions
    ) 
    console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

