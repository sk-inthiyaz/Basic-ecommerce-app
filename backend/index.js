const express = require('express')
const cors = require('cors')
require('./database/config')
const User = require('./database/User');
const Product = require('./database/Product')
const mongoose = require('mongoose')
const app = express();

const Jwt = require('jsonwebtoken')
const jwtKey = 'e-comm';

app.use(cors())
app.use(express.json());
app.post('/register',async (req,resp)=>{
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({result},jwtKey,{expiresIn:"2h"},(err,token)=>{
        if(err){
            resp.send({result:"something went wrong,please try after some time"})
        }
        resp.send({result,auth:token})
    })
    
})

app.post("/login",async (req,resp)=>{
    console.log(req.body)
    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body).select("-password");
        if(user){
            Jwt.sign({user},jwtKey,{expiresIn:"2h"},(err,token)=>{
                if(err){
                    resp.send({result:"something went wrong,please try after some time"})
                }
                resp.send({user,auth:token})
            })
        }
        else{
            resp.send("No user Found")
        }
    }else{
        resp.send({result : 'No User Found'})
    }
})

app.post("/add-product",verifyToken,async (req,resp)=>{
    let product = new Product(req.body)
    let result = await product.save();
    resp.send(result)
})


app.get("/products",verifyToken, async(req,resp)=>{
    let products = await Product.find();//all the products will be assign to products 
    if(products.length>0){
        resp.send(products)
    }
    else{
        resp.send({result:"No Products Found"})
    }
})

app.delete("/product/:id",verifyToken, async (req,resp) => {
    const result = await Product.deleteOne({_id:req.params.id});
    resp.send(result); // This returns {deletedCount: 1} when successful
});

app.get("/product/:id",verifyToken,async (req,resp)=>{
    let result = await Product.findOne({_id:req.params.id});
    if(result){
        resp.send(result)
    }
    else{
        resp.send({result:"No Product Found"})
    }
})

app.put("/product/:id",verifyToken,async(req,resp)=>{
    let result = await Product.updateOne(
        {_id:req.params.id},
        {   
            $set : req.body
        }
    )
    resp.send(result)
});

// To search 
app.get("/search/:key",verifyToken,async (req,resp)=>{
    let result = await Product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {company:{$regex:req.params.key}},
            {category:{$regex:req.params.key}}
        ]
    })
    resp.send(result)
})

function verifyToken(req,resp,next){
    let token =req.headers['authorization'];
    try{
        if(token){
            token = token.split(' ')[1]
            Jwt.verify(token,jwtKey,(err,valid)=>{
                if(err){
                    resp.status(401).send({result:"please provide a valid token"})
                }
                else{
                    next();
                }
            })
        }else{
            resp.send({result:"please add token with header"})
        }
    }
    catch ({ name, message }) {
        console.log(name); // "TypeError"
        console.log(message); // "oops"
      }
}



app.listen(5000)