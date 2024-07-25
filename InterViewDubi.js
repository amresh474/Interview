
// Node js Rest Api 
const express = require('express');
const auth = require('./auth');
const app = express();
app.use(express.json);

const port = process.env.PORT || 4000

app.get('/',auth.isAuthorized,(req,res)=>{

    const { a, b } = req.query;

    if (!a || !b || isNaN(a) || isNaN(b)) {
        return res.status(400).send('Invalid input');
    }

    res.status(200).send({ result: Number(a) + Number(b) });

})

app.listen(port,()=>console.log(`listening on port ${port}`));


// React js code 

import { useEffect, useState } from "react";

function app(params) {

    const url = 'https://dummjson.com/productsdummyjson.com';

    const [products,setProducts]=useState([]);
    const [loading ,setLoading]=useState(false);
    
    useEffect(()=>{
        setLoading(true);
        fetch(url).then(res => res.json()).then(data => setProducts(data))
        .finally(()=>{setLoading(false)});
    },[])

    return(
        <div className="App">
            {loading? (<div> Loading...</div>):
        (<>
        <h1> Product details </h1>
        <table border={1}>
            <tr>
                <th>Product Name </th>
                <th> Description </th>
                <th>Image</th>
            </tr>
            {products && products.map(product =>{
                return (
                <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.discription}</td>
                    <td> <img src={product.url} alt="image"/></td>
                </tr>
                )})}
        </table>
        </>)}
        </div>
    )
}
