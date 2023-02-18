import React, {useState,useRef, useContext, useEffect} from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate  } from 'react-router-dom'


function Login(props) {

  const [error,setError] = useState({show:false,msg:null})
  const {signIn,isLoggedIn} = useContext(AuthContext) 
  const username = useRef()
  const password = useRef()
  const navigate = useNavigate()

  const handleSignIn = async (e) => {
    e.preventDefault()
    props.setLoading(true)
    let res = await signIn(username.current.value,password.current.value)
    props.setLoading(false)
    if(res.data){
      setError({show:false,msg:null})
      localStorage.setItem('token',res.data.accessToken)
      localStorage.setItem('user',res.data.username)
      navigate('/dashboard')
    } else if (res.isonline) {
      setError({show:true,msg:"The account you tried to log in is already active."})
    } else {
      setError({show:true,msg:"invalid user"})
    }
  }

  useEffect(()=>{
    let check = async () => {
      let res = await isLoggedIn(localStorage.getItem('token'))
      if(res.success){
        navigate('/dashboard')
      }
    }
    check()
    // eslint-disable-next-line
  },[isLoggedIn])

  return (
    <div className="border w-full md:w-1/2 mx-auto p-5">

      <h3 className="font-bold">Inventory - Login</h3>
      <form onSubmit={handleSignIn}>
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
        <div className="flex justify-between">
          <button type="submit" className="bg-blue-700 hover:bg-blue-500 text-white w-32 text-center p-3">Sign In</button>
          <a href="/register">New Account?</a>
        </div>
       
      </form>
    </div>
  )
}

export default Login
