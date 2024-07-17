
import mongoose from "mongoose"
const connectToDb = async()=>{
    const url = `mongodb+srv://ankittiwari3690:iamgreen123@cluster0.k4grzch.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    mongoose.connect(url).then(()=>console.log('connected successfully')).catch((e)=>console.log(e))
}

export default connectToDb;