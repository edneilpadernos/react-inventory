import React, { useEffect,useContext,useState,useRef } from 'react'
import { ProductContext } from '../contexts/ProductContext'

function EditProduct(props) {

    const {getProducts,updateProduct,productList,setProductList,productId} = useContext(ProductContext)
    const [error,setError] = useState({show:false,msg:null})

    const nameRef = useRef()
    const categoryRef = useRef()
    const quantityRef = useRef()
    const timeStampRef = useRef()
    const idRef = useRef()

    const hideForm = () => {
        props.hideAddForm()
    }

    

    const changeQty = (op) => {
        let qty = quantityRef.current.value
        if(op==='minus'){
            if(qty==='0'){
                return
            }
            qty--
        }else{
            qty++
        }
        quantityRef.current.value = qty
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(quantityRef.current.value==='0'){
            setError({show:true,msg:"quantity is required!."})
            return;
        }
        props.setLoading(true)
        let res = await updateProduct(
            productId,
            nameRef.current.value,
            quantityRef.current.value,
            categoryRef.current.value,
            timeStampRef.current.value,
            localStorage.getItem('token')
        )
        if(res.success){
            setError({show:false,msg:null})
            hideForm()
            nameRef.current.value=''
            quantityRef.current.value = '0'
            categoryRef.current.value = 'Dairy'
            let result =  await getProducts(localStorage.getItem('token'))
            if(result.success){
                setProductList(result.data)
            }
        } else {
            setError({show:true,msg:"data not in sync. Please reload the page."})
        }
        props.setLoading(false)
    }

    useEffect(()=>{
        let getProductToEdit = () => {
            let productToEdit = productList.filter(data=>data.id === productId)
            console.log(productToEdit)
            idRef.current.value = productToEdit[0].id
            nameRef.current.value = productToEdit[0].name
            categoryRef.current.value = productToEdit[0].category
            quantityRef.current.value = productToEdit[0].quantity
            timeStampRef.current.value = productToEdit[0].updated_at
        }
        getProductToEdit()
        // eslint-disable-next-line
    },[productId])

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex  items-end justify-center p-4 text-center sm:items-center sm:p-0">

            <div className="relative transform overflow-hidden rounded-lg bg-white w-full text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <form onSubmit={handleSubmit}>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="mt-3 text-left sm:mt-0 sm:ml-4">
                            <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">Edit Product</h3>
                            { 
                            error && error.show &&
                            <div className="alert bg-red-300 text-white p-3 mt-5">
                            {error.msg}
                            </div>
                            }
                            <div className="py-1">
                            <label htmlFor='productName' className="text-sm text-gray-500">Product Name</label>
                            <input type="hidden" ref={idRef} />
                            <input type="hidden" ref={timeStampRef} />
                            <input type="text" ref={nameRef} id="productName" className="border p-2 w-full" required/>
                            </div>
                            <div className="py-1">
                            <label htmlFor='productCategory' className="text-sm text-gray-500">Category</label>
                            <select ref={categoryRef} id="productCategory" className="border p-2 w-full">
                                <option>Dairy</option>
                                <option>Cannned Goods</option>
                                <option>Bottles</option>
                                <option>Boxes</option>
                            </select>
                            </div>
                            <div className="py-1">
                            <label htmlFor='product_quantity' className="text-sm text-gray-500">Quantity</label>
                            <div className="flex">
                                <button type="button" onClick={(e)=>changeQty('minus')} className="bg-blue-500 p-2 w-10"><i className="fa-solid fa-minus"></i></button>
                                <input type="text" ref={quantityRef} id="product_quantity" className="border-2 p-2 w-32 text-gray-500 text-center" value="0" readOnly />
                                <button type="button" onClick={(e)=>changeQty('plus')} className="bg-blue-500 p-2 w-10"><i className="fa-solid fa-plus"></i></button>
                            </div>
                            
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button type="submit"  className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700  sm:ml-3 sm:w-auto sm:text-sm">Update</button>
                        <button type="button" onClick={hideForm} className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
        </div>

    </div>
  )
}

export default EditProduct
