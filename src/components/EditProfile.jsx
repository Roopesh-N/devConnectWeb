import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({user}) => {

    console.log(user)
    const dispatch=useDispatch();

    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setage] = useState(user.age);
    const [gender, setgender] = useState(user.gender);
    const [about, setabout] = useState(user.about);
    const [photoUrl, setphotoUrl] = useState(user.photoUrl);
    const [skills, setskills] = useState(user.skills);
    const [error,setError]=useState("");
    const [showtoast,setshowtoast]=useState(false);

    const validateUpdate= async ()=>{
        if(firstName.length<3 || lastName.length<3){
            setError("Name length should be minimum of 3 characters")
            return false
        }
        if(age<18){
            setError("User should be minimum of 18 years old")
            return false
        }
        if(skills.length>100){
            setError("error:skills")
            return false
        }
        if(about.length>150){
            setError("About field is limited to 150 characters")
            return false
        }
        return true;
    }

    const handleUpdate=async()=>{
        try{
            if(!validateUpdate()){
                return;
            }
            const {data}=await axios.patch(BASE_URL+"/profile/edit",{firstName,lastName,age,gender,about,skills,photoUrl},{withCredentials:true})
            console.log("updatesuccessful", data)
            dispatch(addUser(data?.data))
            setshowtoast(true);
            setTimeout(() => {
                setshowtoast(false)
            }, 3000);
        }catch(error){
            console.log(error)
        }

    }

  return (
    <div className=" flex mx-10 ">
        
<div className="card bg-base-300 w-1/2 shadow-xl mx-5  my-5">
  <div className="card-body">
    <h2 className="card-title justify-center">Edit Profile</h2>
    <div className="flex">
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

    </div>

    <div className="flex">
    <label className="form-control w-full max-w-xs">
    <div className="label">
        <span className="label-text font-semibold">Age</span>
    </div>
        <input type="number" max={75} placeholder="Age" 
        className="input input-bordered w-full max-w-xs" 
        value={age}
        onChange={(e)=>setage(e.target.value)}/>
    </label>
    <label className="form-control w-full max-w-xs">
    <div className="label">
        <span className="label-text font-semibold">Gender</span>
    </div>

    <select id="options" name="gender" onChange={(e)=>setgender(e.target.value)} defaultValue={"Select your gender"}>
        <option value="male" >Male</option>
        <option value="female">Female</option>
        <option value="others">Others</option>
    </select>
    </label>
    </div>
    
    <div className="flex">

    <label className="form-control w-full max-w-xs">
    <div className="label">
        <span className="label-text font-semibold">Skills</span>
    </div>
        <input type="text" placeholder="skills" className="input input-bordered w-full max-w-xs"
        value={skills}
        onChange={(e)=>setskills(e.target.value.split(","))} />
    </label>
    <label className="form-control w-full max-w-xs">
    <div className="label">
        <span className="label-text font-semibold">photoUrl</span>
    </div>
        <input type="url" placeholder="Profile Photo Url" className="input input-bordered w-full max-w-xs"
        value={photoUrl}
        onChange={(e)=>setphotoUrl(e.target.value)} />
    </label>

    </div>

    <label className="form-control w-full max-w-xs">
    <div className="label">
        <span className="label-text font-semibold">About</span>
    </div>
        <textarea type="password" placeholder="About" className="input input-bordered w-full max-w-xs"
        value={about}
        onChange={(e)=>setabout(e.target.value)} />
    </label>
    <p className='text-red-500'>{error}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
    </div>
  </div>
</div>

    <UserCard userdetails={{firstName,lastName,age,gender,about,skills,photoUrl}}/>

    {showtoast && <div className="toast toast-top toast-center">
        <div className="alert alert-success">
            <span>Profile updated successfully.</span>
        </div>
    </div>}
    </div>
  )
}

export default EditProfile