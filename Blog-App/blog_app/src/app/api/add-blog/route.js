import connecttoDb from "@/database";
import Blog from "@/models/blog";

import Joi from "joi";
import { NextResponse } from "next/server";


const addNewBlog = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required()
})




export async function POST (req){
    try {
        await connecttoDb();

        const extractBlogData =await req.json();
        const {title , description} = extractBlogData;

        const {error} = addNewBlog.validate({
            title,description
        })

        if(error){
            return NextResponse.json(
                {
                    success:false,
                    message:error.details[0].message
                }
            )
        }

        const newlyCreatedBlogItem = await Blog.create(extractBlogData);
        if(newlyCreatedBlogItem){
            return NextResponse.json({
                success:true,
                message:"new blog added"
            })
        
        }
        else{
            return NextResponse.json({
                success: false,
                message: "something went wrong 1"
            })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "something went wrong 2"
        })
    }
}