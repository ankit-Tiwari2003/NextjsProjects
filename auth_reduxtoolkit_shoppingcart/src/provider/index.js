'use client'

import Header from "@/components/header";
import store from "@/store"
import { Provider } from "react-redux";


export default function ReduxProvider({children}){
    return <Provider store={store}><Header/>{children}</Provider>;
}