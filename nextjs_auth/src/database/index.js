import mongoose from "mongoose"

const connectToDb = ()=>{
    const connectionUrl = "mongodb+srv://ankittiwari3690:iamgreen123@cluster0.vxhj1wj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

    mongoose.connect(connectionUrl).then(()=>console.log('connection successful')).catch(e=>console.log(e))
}

export default connectToDb;