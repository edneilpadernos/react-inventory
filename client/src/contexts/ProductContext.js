import {createContext,useState} from 'react'

export const ProductContext = new createContext()

function ProductContextProvider (props) {

    const [productList,setProductList] = useState([])
    const [productId,setProductId] = useState(null)

    const getProducts = async (token) => {
        
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        });

        return response.json()
    }

    const addProduct = async (name,quantity,category,token) => {
        let data  = {
            name: name,
            quantity:quantity,
            category:category
        }
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        return response.json()
    }

    const updateProduct = async (id,name,quantity,category,token) => {
        let data  = {
            id:id,
            name: name,
            quantity:quantity,
            category:category
        }
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        return response.json()
    }

    const deletceProduct = async (id,token) => {
        let data  = {
            id:id
        }
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        return response.json()
    }

    const values = {
        getProducts,
        addProduct,
        productList,
        setProductList,
        productId,
        setProductId,
        updateProduct,
        deletceProduct
    }

    return (
        <ProductContext.Provider value = {values}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider