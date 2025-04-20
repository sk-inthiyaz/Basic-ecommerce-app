import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
// Here we are creating the list as well as we are delting the items
const ProductList=()=>{
    const[products,setproduct]=useState([]);
    useEffect(()=>{
        getProducts();
    },[])
    const getProducts= async()=>{
        let result = await fetch('http://localhost:5000/products',{
            headers:{
                authorization: `bearer ${localStorage.getItem('token')}`

            }
        });
        //It is in read stream
        result = await result.json();// json format
        setproduct(result); 
        // Save product count to localStorage
        localStorage.setItem('productCount', result.length);
    }
    const deleteProduct=async (id)=>{
        let response = await fetch(`http://localhost:5000/product/${id}`,{
            method:"DELETE",
            headers:{
                authorization: `bearer ${localStorage.getItem('token')}`

            }
        })
        let result = await response.json()
        /**
         * You were checking result.deletedCount before parsing the response The result from fetch() is a Response object, not the JSON data
         */
        if (result.deletedCount) {
            alert("Deleted successfully!");
            getProducts(); // This refreshes the list automatically
        } else {
            alert("Failed to delete");
        }
    }

    const searchHandle=async (event)=>{
        let key = event.target.value;
        if(!key){
            getProducts()
        }
        else{
            let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers:{
                    authorization: `bearer ${localStorage.getItem('token')}`

                }
            })
        result = await result.json();
        if(result){
            setproduct(result);
        }
        }
    }

    console.log("products:",products)
    return(
        <div className='product-list' >
            <h1>Product List</h1>
            <input type='text' className='search-product-box' placeholder='Search Product'  
                onChange={searchHandle}
            ></input>
            <ul>
                <li>S. No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>
            { 
                
                products.length>0? products.map((item,index)=>
                <ul key={item._id} >
                    <li>{index+1}</li>
                    <li>{item.name}</li>
                    <li>${item.price}</li>
                    <li>{item.category}</li>
                    <li >
                        <button onClick={()=>deleteProduct(item._id)} >Delete</button>
                        <Link to={"/update/"+item._id} >Update</Link>

                    </li>
                    
                </ul>
                )
                :<h1>No Result Found</h1>
            }
        </div>
    )
}
export default ProductList;