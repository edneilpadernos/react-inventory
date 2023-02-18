import React, { useEffect, useState, useContext } from 'react'
import AddProduct from '../components/AddProduct'
import ProductList from '../components/ProductList'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

function Dashboard(props) {

  const {isLoggedIn,signOut} = useContext(AuthContext)

  const [showAddForm,setShowAddForm] = useState(false)
  const [activeTab,setActiveTab] = useState('productList')

  const navigate = useNavigate()

  const handleAddProductForm = () => {
    setShowAddForm(true)
  }

  const hideAddForm = () => {
    setShowAddForm(false)
  }

  const handleMenu = (tab) => {
    setActiveTab(tab)
  }

  const logOut = async () => {
    let res = await signOut(localStorage.getItem('user'),localStorage.getItem('token'))
    if(res.success){
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      navigate('/')
    }
    
  }

  let checkUser = async () => {
      let res = await isLoggedIn(localStorage.getItem('token'))
      
      if(!res.success){
        navigate('/')
      }
    }

  let getUserName = () => {
    return localStorage.getItem('user')
  }

  useEffect(()=>{
    
    checkUser()
  })


  return (
    <div className="border">
      {
          showAddForm &&
          <AddProduct hideAddForm={hideAddForm} setLoading={props.setLoading}/>
      }
      <header className="py-5 px-3 flex justify-between flex-wrap">
        <h3 className="font-bold">Inventory - Dashboard</h3>
        <div className="user flex gap-2 items-center">
          <i className="fa-solid fa-user"></i>
          <span>{getUserName()}</span>
          <button onClick={logOut} className="text-blue-500">Sign Out</button>
        </div>
      </header>
      <section className="p-3">
        <h3 className="font-bold">Menu</h3>
        <div className="py-3 flex flex-wrap gap-3">
          <button className="p-2 flex gap-2 items-center border bg-gray-300" onClick={(e)=>handleMenu('productList')}>
          <i className="fa-sharp fa-solid fa-list"></i> Product Listings
          </button>
          <button className="p-2 flex gap-2 items-center border bg-gray-300" onClick={handleAddProductForm}>
          <i className="fa-solid fa-plus"></i> Add Product
          </button>
        </div>
      </section>

      {
        activeTab && activeTab==='productList' &&
        <ProductList setLoading={props.setLoading}/>
      }

      












    </div>
  )
}

export default Dashboard
