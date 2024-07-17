'use client'

import fetchListOfProducts from "@/app/actions";
import { useEffect, useState } from "react";

function clientPageExample() {
    
    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(false)

    async function getListOfProducts(){
        const data = fetchListOfProducts();
        console.log(data);
        if(data) {
            setProducts(data);
            setLoading(true);
        }
    }

    useEffect(()=>{
        getListOfProducts();
    },[])

    if(loading){
        return(<h2>Loading data pls wait</h2>)
    }
    
    return(

        <div>
            <h1>Client Page server actions Example</h1>
            <ul>{
            products && products.length > 0 ?
            products.map(items => <li>{items.title}</li>):
            <h2>none found</h2>
            }</ul>
        </div>
        
    )
}

export default clientPageExample;