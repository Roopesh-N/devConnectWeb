import axios from 'axios';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants';
import validator from "validator";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Signup = () => {
    const [email, setemail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [repwd, setRepwd] = useState("");
    const [error,setError]=useState("");
    const navigate=useNavigate();  
    const dispatch=useDispatch();
    const validateuserDetails=()=>{
        if(password!==repwd){
            setError("Passwords Must Match");
            return false;
        }
        if (!validator.isEmail(email)){
            setError("Invalid email");
            return false
        }
        if(!validator.isStrongPassword(password)){
            setError("enter strong password!!")
            return false
        }
        if(firstName.length<3 || lastName.length<3){
            setError("Name length should be minimum of 3 characters")
            return false
        }
        return true;

    }
    const handleSignUp= async ()=>{
        setError("")
        try{
            if(!validateuserDetails()){
                return;
            }
            const response=await axios.post(BASE_URL+ "/signup",{
                firstName,
                lastName,
                email,
                password,
            },{withCredentials:true})
            if(response.status===200){
                dispatch(addUser(response?.data?.data))
                navigate("/profile")
            }
        }catch(error){
            if(error.status===400){
                setError("Email already exists!")
                return ;
            }
            console.log(error)
        }

    }  

  return (
    <div className='flex justify-center my-10'>

<div className="card bg-base-300 w-1/3 shadow-xl ">
  <div className="card-body">
    <h2 className="card-title justify-center">SignUp</h2>

    <label className="form-control w-full max-w-xs">
    <div className="label">
        <span className="label-text font-semibold">FirstName</span>
    </div>
        <input type="text" placeholder="FirstName" 
        className="input input-bordered w-full max-w-xs" 
        value={firstName}
        onChange={(e)=>setFirstName(e.target.value)}/>
    </label>


    <label className="form-control w-full max-w-xs">
    <div className="label">
        <span className="label-text font-semibold">LastName</span>
    </div>
        <input type="text" placeholder="LastName" 
        className="input input-bordered w-full max-w-xs" 
        value={lastName}
        onChange={(e)=>setLastName(e.target.value)}/>
    </label>
    

    <label className="form-control w-full max-w-xs">
    <div className="label">
        <span className="label-text font-semibold">Email</span>
    </div>
        <input type="text" placeholder="Email" 
        className="input input-bordered w-full max-w-xs" 
        value={email}
        onChange={(e)=>setemail(e.target.value)}/>
    </label>

    <label className="form-control w-full max-w-xs">
    <div className="label">
        <span className="label-text font-semibold">Password</span>
    </div>
        <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs"
        value={password}
        onChange={(e)=>setPassword(e.target.value)} />
    </label>

    <label className="form-control w-full max-w-xs">
    <div className="label">
        <span className="label-text font-semibold">Password</span>
    </div>
        <input type="password" placeholder="re-enter Password" className="input input-bordered w-full max-w-xs"
        value={repwd}
        onChange={(e)=>setRepwd(e.target.value)} />
    </label>

    <p className='text-red-500'>{error}</p>
    <div className="card-actions justify-center mt-5">
      <button className="btn btn-primary" onClick={handleSignUp}>SignUp</button>
    </div>
    <Link to="/login"><p className='text-blue-700 cursor-pointer hover:underline'>Login?</p></Link>
  </div>
</div>
    </div>
  )
}

export default Signup