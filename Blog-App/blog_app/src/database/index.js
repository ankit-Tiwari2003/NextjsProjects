import mongoose from "mongoose";

const connecttoDb = async ()=>{
    const connectionUrl = "mongodb+srv://ankittiwari3690:iamgreen123@cluster0.fghloff.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

    mongoose.connect(connectionUrl).then(()=>console.log("db connected")).catch((error)=>console.log(error))
}

export default connecttoDb;