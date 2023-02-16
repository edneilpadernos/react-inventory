import React,{useState,useRef,useContext} from 'react'
import {AuthContext} from '../contexts/AuthContext'
import { useNavigate  } from 'react-router-dom'

function Register(props) {
    const username = useRef()
    const password = useRef()
    const confirm = useRef()
    const [error,setError] = useState({show:false,msg:null})

    const{register} = useContext(AuthContext)

    const navigate = useNavigate()

    const handleRegister= async (e)=>{
        e.preventDefault()
        if(password.current.value!==confirm.current.value){
            setError({show:true,msg:'mismatched password.'})
            return
        }
        props.setLoading(true)
        let res = await register(username.current.value,password.current.value,'admin')
        props.setLoading(false)
        if(res.success) {
            setError({show:false,msg:null})
            navigate("/")
        }else {
            setError({show:true,msg:'unable to register this account.'})
        }
        
    }
    return (
        <div className="border w-full md:w-1/2 mx-auto p-5">
          <h3 className="font-bold">Inventory - Register Account</h3>
          <form onSubmit={handleRegister}>
            {
                error && error.show &&
                <div className="alert bg-red-300 text-white p-3 mt-5">
                {error.msg}
                </div>
            }
            
            <div className="input-group my-3">
              <label htmlFor="username">Username</label>
              <input type="text" className="w-full p-3 border" placeholder="username" required ref={username}/>
            </div>
            <div className="input-group my-3">
              <label htmlFor="username">Password</label>
              <input type="password" className="w-full p-3 border" placeholder="password" required ref={password}/>
            </div>
            <div className="input-group my-3">
              <label htmlFor="username">Confirm Password</label>
              <input type="password" className="w-full p-3 border" placeholder="re-type password" required ref={confirm}/>
            </div>
            <button type="submit" className="bg-blue-700 hover:bg-blue-500 text-white w-32 text-center p-3">Register</button>
          </form>
        </div>
      )
}

export default Register
