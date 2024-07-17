'use server'

import connectToDb from "@/database"
import User from "@/models/user";
import { revalidatePath } from "next/cache";

//add new user
export async function addNewUserAction(formData,pathToRevalidate){
    await connectToDb();
    console.log('Form Data:', formData);
    try {
        const newlyCreatedUser = await User.create(formData);
        if(newlyCreatedUser){
            revalidatePath(pathToRevalidate);
            return {
                success:true,
                message:'user created'
            }
        }
        else{
            return {
                success: false,
                message: "something went wrong"
            }
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "something went wrong"
        }
    }
}
//fetch users

export async function fetchUsersAction(){
    await connectToDb();
    try {
        const listOfUsers = await User.find({})
        if(listOfUsers){
            return({
                success:true,
                data:JSON.parse(JSON.stringify(listOfUsers))
            })
        }
        else{
            return {
                success: false,
                message: "something went wrong"
            }
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "something went wrong"
        }
    }
}
//edit users

export async function editUserAction(currentUserId,formData,pathToRevalidate){
    try {
        await connectToDb();

        const{firstName,lastName,email,address} = formData;
        const EditedUser = await User.findByIdAndUpdate({
            _id : currentUserId
        },{firstName,lastName,email,address},{new:true})

        if(EditedUser){
            revalidatePath(pathToRevalidate);
            return {
                success: true,
                message: 'updated successfully'
            }
        }
        else{
            return {
                success: false,
                message: "something went wrong"
            }
        }

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "something went wrong"
        }
    }
}

//delete users
export async function deleteUserFunction(currentUserId,pathToRevalidate){
    try {
    await connectToDb();

    const deletedUser = await User.findByIdAndDelete(currentUserId);

    if(deletedUser){
        revalidatePath(pathToRevalidate);
        return {
            success:true,
            message:'user deleted successfully'
        }
    }else{
        return{
            success:false,
            message:'not deleted'
        }
    }

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "something went wrong"
        }
    }
}

