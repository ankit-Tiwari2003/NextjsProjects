import Loading from "@/app/loading";
import { Suspense } from "react";

const { default: ReduxProvider } = require("@/provider");

async function CommmonLayout({children}){
    return <ReduxProvider>{children}</ReduxProvider>;
}
export default CommmonLayout;