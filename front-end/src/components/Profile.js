import react from 'react'
const Profile = ()=>{
    const auth = localStorage.getItem('user');
    const productCount = localStorage.getItem('productCount')
    console.log("profile:", productCount);
    return(
        <div className='profile'>
                <h1>Profile Details</h1>
                <div className='pin'>
                <h2>Name:{JSON.parse(auth).name}</h2>
                <h2>Total Items: {productCount}</h2>
                </div>
        </div>
    )
}
export default Profile;