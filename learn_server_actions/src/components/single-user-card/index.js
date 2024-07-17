'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "../ui/button";
import { deleteUserFunction } from "@/app/actions";
import { useContext } from "react";
import { UserContext } from "@/context";

  

function SingleUserCard({user}) {
  
  const {setCurrentEditedId, setOpenPopUp, setAddNewUserFormData} = useContext(UserContext);

  async function handleDelete(getCurrentUserId){
    const result = await deleteUserFunction(getCurrentUserId,'/user-management');
    console.log(result);
  }


  function handleEdit(getCurrentUser){
    setOpenPopUp(true);
    setAddNewUserFormData({
      firstName:getCurrentUser?.firstName,
      lastName:getCurrentUser?.lastName,
      email:getCurrentUser?.email,
      address:getCurrentUser?.address
    })
    setCurrentEditedId(getCurrentUser?._id);
  }

    return ( 
        <Card>
  <CardHeader>
    <CardTitle>{user?.firstName} {user?.lastName}</CardTitle>
    <CardDescription>{user?.email}</CardDescription>
  </CardHeader>
  <CardContent>
    <p>{user?.address}</p>
  </CardContent>
  <CardFooter className="flex justify-between">
      <Button onClick={()=>handleEdit(user)}>Edit</Button>
      <Button onClick={()=>handleDelete(user?._id)}>Delete</Button>
  </CardFooter>
  
</Card>

     );
}

export default SingleUserCard;