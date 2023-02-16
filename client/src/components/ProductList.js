import React, { useContext, useState,useEffect } from 'react'
import EditProduct from './EditProduct'
import DeleteProduct from './DeleteProduct'
import { ProductContext } from '../contexts/ProductContext'



function ProductList(props) {

    const {getProducts,setProductList,productList,setProductId} = useContext(ProductContext)

    

    const [showEditProductForm,setShowEditProductForm] = useState(false)
    const [showConfirmDelete,setshowConfirmDelete] = useState(false)

    const handleEdit = (prod) => {
        setProductId(prod.id)
        setShowEditProductForm(true)
    }

    const handleDelete = (prod) => {
        setProductId(prod.id)
        setshowConfirmDelete(true)
    }

    const hideAddForm = () => {
        setShowEditProductForm(false)
        setshowConfirmDelete(false)
    }

    useEffect( ()=>{
        let getData = async ()=> {
            let result =  await getProducts(localStorage.getItem('token'))
            if(result.success){
                setProductList(result.data)
            }
        }
        getData()
        // eslint-disable-next-line
    },[])




  return (
    <>
        {
            showEditProductForm &&
            <EditProduct hideAddForm={hideAddForm} setLoading={props.setLoading} />
        }
        {
            showConfirmDelete &&
            <DeleteProduct hideAddForm={hideAddForm} setLoading={props.setLoading}/>
        }

        <section className="py-5 px-3 overflow-auto">
            <h3 className="font-bold">Product Listing</h3>
            <table className="table-striped w-full table-auto">
            <thead>
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody className="text-center">
                {
                    productList && productList.length > 0 &&
                    productList.map((product=>
                        <tr key={product.id} className="border-b-2">
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>{product.quantity}</td>
                        <td className="flex gap-3 justify-center text-white">
                            <button onClick={(e)=>handleEdit(product)} className="bg-yellow-500 p-2 w-32"><i className="fa-solid fa-pen-to-square"></i> Edit</button>
                            <button onClick={(e)=>handleDelete(product)} className="bg-red-500 p-2 w-32"><i className="fa-solid fa-trash"></i> Delete</button>
                        </td>
                        </tr>
                    ))
                    
                }
            </tbody>
            </table>
        </section>

    </>
  )
}

export default ProductList
