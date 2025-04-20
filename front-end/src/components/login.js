import React ,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom'; 
const Login=()=>{
    const [email,setEmail] = React.useState('')
    const [password,setPassword] =React.useState('')
    const navigate = useNavigate();
    useEffect (()=>{
        //i the user auth he/she cant go to log in 
        //this means if the use is log in why should he go o log in page ....(http:localhost:3000/login)
        const auth = localStorage.getItem('user');
        if(auth){
            navigate("/")
        }
    })
    
    const handleLogin= async ()=>{
        console.warn(email,password)
        let result = await fetch('http://localhost:5000/login',{
            method: 'post',
            body: JSON.stringify({email, password }),
            headers: {
                "Content-Type": "application/json",
            }
        })
        result = await result.json();
        console.log(result);
        if(result.auth){
            localStorage.setItem("user",JSON.stringify(result.user))
            localStorage.setItem("token", result.auth);

            navigate("/")
        }else{
            alert("Please enter correct details")
        }
    }
    


    return(
        <div className='login' > 
            <h1>Log in</h1>
            <ul>
                <li>
                    <input
                        className="loginputBox" 
                        type='text' 
                        placeholder='Enter Email' 
                        onChange={(e)=>setEmail(e.target.value)}
                        value={email}
                    ></input>
                </li>
                <li>
                    <input 
                        className="loginputBox" 
                        type='password' 
                        placeholder='Enter Password' 
                        onChange={(e)=>setPassword(e.target.value)}
                        value={password}
                    ></input>
                </li>
            </ul>
            <button 
            onClick={handleLogin}
            type="button">
            log in
            </button>
         </div>
    )
}
export default Login;