
import React, { use } from 'react'

const AddProduct=()=>{
    const[name,setName]=React.useState('');
    const[price,setPrice]=React.useState('');
    const[category,setCategory]=React.useState('');
    const[company,setCompany]=React.useState('');
    const[error,setError]=React.useState(false);
    const addProduct = async ()=>{
        if(!name || !price || !category || !company){
            setError(true)
            return false;
        }
        console.log(name,price,category,company)
        const userId = JSON.parse(localStorage.getItem('user'))._id;//convert string to json
        let result = await fetch('http://localhost:5000/add-product',{
            method:'post',
            body:JSON.stringify({name,price,category,company}),//converts json to string
            headers:{
                 "Content-Type": "application/json",
                 authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.log(result)
    }
    return( 
        <div className='product' >
            <h1>AddProduct</h1>
            <input type='text' placeholder='Enter Product name' onChange={(event)=>{setName(event.target.value)}}  value={name} ></input>
            {error &&  !name && <span className='invalid-input' >Enter a valid name* </span>}
            <input type='text' placeholder='Enter Product Price' onChange={(event)=>{setPrice(event.target.value)}} value={price} ></input>
            {error &&  !price && <span className='invalid-input' >Enter a valid price* </span>}
            <input type='text' placeholder='Enter Product category' onChange={(event)=>{setCategory(event.target.value)}} value={category} ></input>
            {error &&  !category &&  <span className='invalid-input' >Enter a valid category* </span>}
            <input type='text' placeholder='Enter Product company' onChange={(event)=>{setCompany(event.target.value)}} value={company} ></input>
            {error &&  !company &&  <span className='invalid-input' >Enter a valid company* </span>}
            <button onClick={addProduct} >Add Product</button>
        </div>
    )
}
export default AddProduct;