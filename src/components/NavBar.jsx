import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../utils/userSlice'
import { BASE_URL } from '../constants'
import { Link, useNavigate } from 'react-router-dom'
import { clearFeed } from '../utils/feedSlice'
import { removeConnections } from '../utils/connectionSlice'
import {  clearRequests } from '../utils/requestSlice'

const NavBar = () => {
  const user=useSelector((store)=>store.user)
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handlelogout=async ()=>{
    try{
      const res=await axios.post(BASE_URL+"/logout",{},{withCredentials:true})
      if(res.status===200){
        dispatch(removeUser())
        dispatch(clearFeed())
        dispatch(removeConnections())
        dispatch(clearRequests())
        navigate("/login")
      }
    }catch(error){
      console.log(error)
    }
  }

  return (
      <div className="navbar bg-base-300">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">DevConnect👩‍💻</Link>
  </div>
  <div className="flex-none gap-2">
    {user &&(
      <div className='flex items-center'>
      <div>Welcome {user.firstName}</div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mx-6">
        <div className="w-10 rounded-full">
          <img
            alt="user profile img"
            src={user.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
          </Link>
        </li>
        <li><Link to="/connections">Connections</Link></li>
        <li><Link to="/requests">Requests</Link></li>
        <li onClick={handlelogout}><a>Logout</a></li>
      </ul>
    </div>
    </div>)}
  </div>
</div>
  )
}

export default NavBar