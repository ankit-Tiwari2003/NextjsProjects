'use server'

import connectToDb from "@/database"
import User from "@/models";
import bcryptjs from "bcryptjs";
import bcrypt from "bcryptjs/dist/bcrypt";
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";

export async function RegisterUserAction(formData){
    await connectToDb();

    try {
        const {userName,email,password} = formData;
        const checkUser = await User.findOne({ email });
        if(checkUser){
            return{
                success:false,
                message:"User with this email exist, try diffrent email"
            }
        }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password,salt);
    
    const newlyCreatedUser = new User({
        userName,
        email,
        password: hashedPassword
    });
    const savedUser = newlyCreatedUser.save();

    if(savedUser){
        return {
            success:true,
            data:JSON.parse(JSON.stringify(savedUser))
        }
    }
    else{
        return{
            success:false,
            message:"something went wrong"
        }
    }

    } catch (error) {
        console.log(error);
        return {
            success:false,
            message:"something went wrong"
        }
    }

}

export async function loginUserAction(formData){
    await connectToDb();
    try {
        const {email,password} = formData;

        const checkUser = await User.findOne({email});
        if(!checkUser){
            return{
                success:false,
                message:"user doesnt exist sign UP first"
            }
        }
        const checkPassword = await bcryptjs.compare(password,checkUser.password);

        if(!checkPassword){
            return{
                success:false,
                message:"wrong password, check password and try again"
            }
        }
    const createdTokenData= {
        id:checkUser._id,
        userName:checkUser.userName,
        email:checkUser.email
    }

    const token = jwt.sign(createdTokenData,"DEFAULT_KEY",{expiresIn:'1d'});

    const getCookies = cookies();
    getCookies.set('token',token);

    return{
        success:true,
        message:"login is successfull"
    }

    } catch (error) {
        console.log(error);
        return {
            success:false,
            message:'something went wrong pls try again'
        }
    }
    
}
export async function fetchAuthUserAction(){
    await connectToDb();
    try {
        const getCookies = cookies();
        const token = getCookies.get('token')?.value || "";
        if(token === ""){
            return{
                success:false,
                message:'token not valid'
            }

        }
    const decodedToken = jwt.verify(token,"DEFAULT_KEY");
    const getUserInfo = await User.findOne({_id:decodedToken.id})


    if(getUserInfo){
        return {
            success:true,
            message:JSON.parse(JSON.stringify(getUserInfo))
        };

    }else{
        return{
            success:false,
            message:"some error occured"
        }
    }

    } catch (error) {
        console.log(error);
        return {
            success:false,
            message:'something went wrong pls try again'
        }
    }
}

export async function logoutAction(){
    const getCookies = cookies();
    getCookies.set('token','')
}