import connecttoDb from "@/database";
import Blog from "@/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server";

const EditBlog = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required()
})

export async function PUT(req){
    try {
        await connecttoDb();
        const {searchParams}= new URL(req.url);
        const getCurrentBlogId = searchParams.get('id');

        if(!getCurrentBlogId){
            return NextResponse.json({
                success:false,
                message:"id not recived"
            })
        }

        const {title,description} = await req.json();
        const {error} = EditBlog.validate({
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

    const updateBlogById = await Blog.findOneAndUpdate({
        _id:getCurrentBlogId
    },{title,description},{new:true});

    if(updateBlogById){
        return NextResponse.json({
            success:true,
            message:"updated successfully"
        })
    }
    else{
        return NextResponse({
            success:false,
            message:"something went wrong"
        })
    }
    
    } catch (error) {
        console.log(error);
        return NextResponse({
            success:false,
            message:"something went wrong"
        })
    }
}