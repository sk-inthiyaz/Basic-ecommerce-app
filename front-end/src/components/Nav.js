import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
const Nav=()=>{
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout=()=>{
        localStorage.clear()
        navigate('/SignUp')
    }
    return(
        <div >
            
            { auth ? <ul className='nav-ul' >
                <img 
            className='logo'
            src='https://marketplace.canva.com/EAFzjXx_i5w/1/0/1600w/canva-blue-illustrative-e-commerce-online-shop-logo-fZejT2DpGCw.jpg'
            alt='logo'
            ></img>
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link to="/update">Update Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li> <Link onClick={logout} to="/SignUp">Logout ({JSON.parse(auth).name}) </Link></li>
            </ul>
            :
            <ul className='nav-right' >
                <li> <Link to="/SignUp">Sign Up</Link> </li>
                <li><Link to="/login" >Login</Link></li>
            </ul>
            }
        </div>
    )
}
export default Nav;