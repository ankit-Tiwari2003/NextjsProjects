import { fetchAuthUserAction } from "@/actions";
import Logout from "@/components/logout";
import { redirect } from "next/navigation";

export default async function Home() {

  const currentUser = await fetchAuthUserAction();
  console.log(currentUser)
  
  if(!currentUser?.success){
    redirect("/sign-in");
  }
  return (
    <div><h1>
      next js authentication
      </h1>
      <h2>{currentUser?.message?.userName}</h2>
      <h2>{currentUser?.message?.email}</h2>
      <Logout/>
      </div>
  );
}
