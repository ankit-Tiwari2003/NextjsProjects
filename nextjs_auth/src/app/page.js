import { fetchAuthUserAction } from "@/actions";
import Logout from "@/components/logout";
import { redirect } from "next/navigation";

export default async function Home() {

  const currentUser = await fetchAuthUserAction();
  
  if(!currentUser?.success){
    redirect("/sign-in");
  }
  return (
    <div><h1>
      next js authentication
      </h1>
      <h2>{currentUser?.data?.name}</h2>
      <h2>{currentUser?.data?.email}</h2>
      <Logout/>
      </div>
  );
}
