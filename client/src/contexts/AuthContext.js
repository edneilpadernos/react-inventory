import {createContext} from 'react'

export const AuthContext = new createContext()

function AuthContextProvider (props) {

    

    const isLoggedIn = async(token) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/token`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        });
        return response.json()
    }
    const register = async (username,password,level) => {
        let data  = {
            username: username,
            password:password,
            level:level
        }
        const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        return response.json()
    }

    const signIn = async (username,password) => {
        let data  = {
            username: username,
            password:password
        }
        const response = await fetch(`${process.env.REACT_APP_API_URL}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        return response.json()
    }

    const values = {
        register,
        signIn,
        isLoggedIn
    }

    return (
        <AuthContext.Provider value = {values}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider