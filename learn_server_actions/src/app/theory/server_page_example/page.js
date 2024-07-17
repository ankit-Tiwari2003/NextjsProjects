
// async function fetchListOfProducts(){
//     const res = await fetch(`https://dummyjson.com/products`);
//     const data = await res.json();

import fetchListOfProducts from "@/app/actions";

//     return data?.products;

// }

async function ServerActionExample(){

    

const products = await fetchListOfProducts();
    console.log(products);

    return(
        <div><h1>Server actions example</h1>
        <ul>{
            products && products.length > 0 ?
            products.map(items => <li>{items.title}</li>):
            <h2>none found</h2>
            }</ul>
        </div>
    );
}

export default ServerActionExample;