'use client'

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
  
import { Button } from "../ui/button";

const { Fragment } = require("react");

function AddNewBlog({openBlogDialog, setOpenBlogDialog, loading, setLoading,blogFormData,setBlogFormData,handleSaveBlogData,currentEditedBlogId,setcurrentEditedBlogId}){
  
    return(
        <Fragment>
          
            <div>
                <Button onClick={()=>setOpenBlogDialog(true)}>Add New Blog</Button>
            </div>
            
            <Dialog open= {openBlogDialog} onOpenChange={()=>{
              setOpenBlogDialog(false),
              setBlogFormData({
                title:"",
                description:"",
              })
              setcurrentEditedBlogId(null)
            }}>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{currentEditedBlogId ? 'Edit This Blog' : 'Add New Blog'}</DialogTitle>
          
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              name ="title"
              placeholder = "Enter Blog Title here"
              value = {blogFormData.title}
              onChange = {(event)=>setBlogFormData({
                ...blogFormData,
                title: event.target.value,
              })
            }
              id="title"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Description" className="text-right">
              Description
            </Label>
            <Input
              name="description"
              value={blogFormData.description}
              onChange= {(event)=>setBlogFormData({
                ...blogFormData,
                description: event.target.value,
              })
            }
              id="Description"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSaveBlogData} type="button">{loading ? "Saving Changes" : "Save Changes"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    
    </Fragment>
    )
}

export default AddNewBlog;