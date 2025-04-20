import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Login from './components/login';
import AddProduct from './components/AddProduct';
import UpdateProduct from './components/UpdateProduct'
import ProductList from './components/ProductList';
import PrivateComponentRoute from './components/privateComponent';
import Profile from './components/Profile';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav></Nav>
        <Routes>
          <Route element={<PrivateComponentRoute/>}>
            <Route path='/' element={<ProductList/>} ></Route>
            <Route path='/add' element={<AddProduct/>} ></Route>
            <Route path='/update/:id' element={<UpdateProduct/>} ></Route>
            <Route path='/logout' element={<h1>logout Page</h1>} ></Route>
            <Route path='/profile' element={<Profile/>} ></Route>
          </Route>
          <Route path='/signUp' element={<SignUp/>} ></Route>
          <Route path='/login' element={<Login/>} >  </Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
