'use client'

import { addNewUserAction, editUserAction } from "@/app/actions";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addNewUserFormControls, addNewUserFormInitialState } from "@/utils";
import { useContext, useState } from "react";
import { UserContext } from "@/context";

function AddNewUser() {
  const {openPopUp, setOpenPopUp,addNewUserFormData, setAddNewUserFormData,currentEditedId,setCurrentEditedId} = useContext(UserContext);
  function handleSaveButtonValid() {
    return Object.keys(addNewUserFormData).every((key) => addNewUserFormData[key].trim() !== '');
  }

  async function handleAddNewUserAction(event) {
    event.preventDefault();
    const result = currentEditedId != null ? await editUserAction(currentEditedId,addNewUserFormData,'/user-management') : await addNewUserAction(addNewUserFormData,"/user-management");
    console.log(result);
    setOpenPopUp(false);
    setAddNewUserFormData(addNewUserFormInitialState);
    setCurrentEditedId(null);
  }

  console.log(addNewUserFormData);
  return (
    <div>
      <Button onClick={() => setOpenPopUp(true)}>Add New User</Button>
      <Dialog open={openPopUp} onOpenChange={() => {
        setOpenPopUp(false);
        setAddNewUserFormData(addNewUserFormInitialState);
        setCurrentEditedId(null);
      }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{
              currentEditedId != null ? 'Edit User' : 'Add User'
              }</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddNewUserAction} className="grid gap-4 py-4">
            <div>
              {addNewUserFormControls.map(controlItem => (
                <div key={controlItem.name}>
                  <Label htmlFor={controlItem.name} className="text-right">
                    {controlItem.label}
                  </Label>
                  <Input
                    id={controlItem.name}
                    name={controlItem.name}
                    placeholder={controlItem.placeholder}
                    className="col-span-3"
                    type={controlItem.type}
                    value={addNewUserFormData[controlItem.name] || ''}
                    onChange={(event) => setAddNewUserFormData({
                      ...addNewUserFormData,
                      [controlItem.name]: event.target.value,
                    })}
                  />
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button className="disabled:opacity-35" disabled={!handleSaveButtonValid()} type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewUser;
