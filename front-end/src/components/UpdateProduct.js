import React, { use, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'; 
const UpdateProduct=()=>{
    const[name,setName]=React.useState('');
    const[price,setPrice]=React.useState('');
    const[category,setCategory]=React.useState('');
    const[company,setCompany]=React.useState('');
    const[error,setError]=React.useState(false);
    const params = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        console.log("Product ID:", params.id); // Add this line
        getProducDetails();
    },[])

    const getProducDetails = async ()=>{
        console.log(params)
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
    }

  

    const updateproduct = async ()=>{
        console.log(name,price,category,company)
        let response = fetch(`http://localhost:5000/product/${params.id}`,{
            method:'PUT',
            body:JSON.stringify({name,price,category,company}),
            headers:{
                'Content-Type':"application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        let result = await (await response).json();
        console.log(result)
        navigate("/")
    }
    return( 
        <div className='product' >
            <h1>UpdateProduct</h1>
            <input type='text' placeholder='Enter Product name' onChange={(event)=>{setName(event.target.value)}}  value={name} ></input>
            {error &&  !name && <span className='invalid-input' >Enter a valid name* </span>}
            <input type='text' placeholder='Enter Product Price' onChange={(event)=>{setPrice(event.target.value)}} value={price} ></input>
            {error &&  !price && <span className='invalid-input' >Enter a valid price* </span>}
            <input type='text' placeholder='Enter Product category' onChange={(event)=>{setCategory(event.target.value)}} value={category} ></input>
            {error &&  !category &&  <span className='invalid-input' >Enter a valid category* </span>}
            <input type='text' placeholder='Enter Product company' onChange={(event)=>{setCompany(event.target.value)}} value={company} ></input>
            {error &&  !company &&  <span className='invalid-input' >Enter a valid company* </span>}
            <button onClick={updateproduct} >update Product</button>
        </div>
    )
}
export default UpdateProduct;