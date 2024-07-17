import { fetchUsersAction } from "@/app/actions";
import AddNewUser from "@/components/add-new-user";
import SingleUserCard from "@/components/single-user-card";

async function UserManagement() {
    const getListOfUsers = await fetchUsersAction();
    console.log(getListOfUsers);
    return (
        <div className="p-20 max-w-6xl ">
            <div className="flex justify-between">User Management
            <AddNewUser/>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {
                    getListOfUsers && getListOfUsers.data && getListOfUsers.data?.length > 0 ?
                    getListOfUsers.data.map(userItem => <SingleUserCard className="ml-3" user = {userItem}/>)
                    : <h2>user not found first create one</h2>
                }
            </div>
        </div>
            )
}

export default UserManagement;