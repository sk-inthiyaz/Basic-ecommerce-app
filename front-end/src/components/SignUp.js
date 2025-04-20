import React, { useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom'
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
    useEffect(()=>{
        //if we  have user information the we should disable sign up page 
        const auth = localStorage.getItem('user')
        if(auth){
            navigate("/")
        }
    })

  const collectData = async () => {
    console.warn(name, email, password);
    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      
      headers: {
        "Content-Type": "application/json",
      }
    }); //this is function but javascrpt says it as api only first parameter url second body..
    result = await result.json();
    console.log(result);
    localStorage.setItem("user",JSON.stringify(result.result))
    localStorage.setItem("token", result.auth);

    //if we use the above localstorage ..if the user comes again he should not going to sign up again
    navigate('/')



  };

  return (
    <div className="register">
      <h1>Sign up page </h1>
      <ul>
        <li>
          <input
            className="inputBox"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
          ></input>
        </li>

        <li>
          <input
            className="inputBox"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='"Enter Email'
          ></input>
        </li>

        <li>
          <input
            className="inputBox"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='"Enter Password'
          ></input>
        </li>
      </ul>
      <button onClick={collectData} type="button">
        Sign Up
      </button>
    </div>
  );
};
export default SignUp;
