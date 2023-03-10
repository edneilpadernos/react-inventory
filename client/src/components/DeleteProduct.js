import React ,{useContext,useRef} from 'react'
import { ProductContext } from '../contexts/ProductContext'

function DeleteProduct(props) {

    const {getProducts,setProductList,productId,deletceProduct} = useContext(ProductContext)
    const idRef = useRef()

    const hideForm = () => {
        props.hideAddForm()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        props.setLoading(true)
        let res = await deletceProduct(
            productId,
            localStorage.getItem('token')
        )
        if(res.success){
            hideForm()
            idRef.current.value=''
            let result =  await getProducts(localStorage.getItem('token'))
            if(result.success){
                setProductList(result.data)
            }
        }
        props.setLoading(false)
    }

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex  items-end justify-center p-4 text-center sm:items-center sm:p-0">

            <div className="relative transform overflow-hidden rounded-lg bg-white w-full text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <form onSubmit={handleSubmit}>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="mt-3 text-left sm:mt-0 sm:ml-4">
                            <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">Confirmation</h3>
                            <p className="text-sm">You're about to delete this product. Do you want to continue?</p>
                            <input type="hidden" ref={idRef} />
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button type="submit"  className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700  sm:ml-3 sm:w-auto sm:text-sm">Yes</button>
                        <button type="button" onClick={hideForm} className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
        </div>

    </div>
  )
}

export default DeleteProduct
