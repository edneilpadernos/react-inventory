import './App.css';
import {Route, Routes} from 'react-router-dom' 
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import AuthContextProvider from './contexts/AuthContext';
import ProductContextProvider from './contexts/ProductContext'
import Loader from './components/Loader'
import React,{useState} from 'react';
function App() {

  const[loading,setLoading] = useState(false)
  
  

  return (
    <>
    {
      loading && <Loader/>
    }
    <div className="ml-auto mr-auto w-full px-5" style={{ maxWidth:"1366px" }}>
      <AuthContextProvider>
        <ProductContextProvider>
        <Routes>
          <Route path='/' exact element={<Login setLoading={setLoading}/>} />  
          <Route path='/register' exact element={<Register setLoading={setLoading} />} />  
          <Route path='/dashboard' exact element={<Dashboard setLoading={setLoading} />} />
          <Route path="*" element = {<Login setLoading={setLoading} />} />  
        </Routes> 
        </ProductContextProvider> 
      </AuthContextProvider>
    </div>
    </>
  );
}

export default App;
