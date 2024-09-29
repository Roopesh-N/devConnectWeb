import axios from 'axios';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants';

const Login = () => {
    const [email, setemail]=useState("");
    const [password, setpassword]=useState("");
    const [error,setError]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const user=useSelector((store)=>store.user)

    const handleLogin=async ()=>{
        try{
            const data=await axios.post(BASE_URL+"/login",{
                email,
                password
            },{withCredentials:true})
            
            if(data.status===200){
                dispatch(addUser(data.data))
                navigate("/")
            }
        }catch(error){
            setError(error?.response?.data || "Something went Wrong")
            console.log(error?.response?.data)
        }
    }
    useEffect(()=>{
        if(user){
            navigate("/");
        }
    });

  return (
    <div className='h-[90vh]'>

    <div className='flex justify-center my-10'>

<div className="card bg-base-300 w-96 shadow-xl ">
  <div className="card-body">
    <h2 className="card-title justify-center">Login</h2>
    <label className="form-control w-full max-w-xs">
    <div className="label">
        <span className="label-text font-semibold">Email</span>
    </div>
        <input type="text" placeholder="Type here" 
        className="input input-bordered w-full max-w-xs" 
        value={email}
        onChange={(e)=>setemail(e.target.value)}/>
    </label>

    <label className="form-control w-full max-w-xs">
    <div className="label">
        <span className="label-text font-semibold">Password</span>
    </div>
        <input type="password" placeholder="Type here" className="input input-bordered w-full max-w-xs"
        value={password}
        onChange={(e)=>setpassword(e.target.value)} />
    </label>
    <p className='text-red-500'>{error}</p>
    <div className="card-actions justify-center mt-5">
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
    <Link to="/signup"><p className='text-blue-700 cursor-pointer hover:underline'>Create account?</p></Link>
  </div>
</div>
    </div>
    </div>  
  )
}

export default Login