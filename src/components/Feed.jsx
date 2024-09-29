import  { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../constants';
import { addFeed, removeFeed } from '../utils/feedSlice';
import axios from 'axios';
import UserCard from './UserCard';

const Feed = () => {
  const feed=useSelector((store)=>store.feed)
  const dispatch=useDispatch();
  const [showtoast,setshowtoast]=useState(false);
  const notifyMessage=useRef("nothing yet");
  const getFeed=async ()=>{
    try{
      if(feed.length>0) return;
      const results=await axios.get(BASE_URL+"/feed",{withCredentials:true});
      // console.log(results?.data?.data)
      dispatch(addFeed(results?.data?.data))
    }catch(error){
      console.log(error)
    }
  }

    useEffect(()=>{
      getFeed();
    },[])

    const handleInterest=async(status,userId)=>{
      try{
        const {data}=await axios.post(BASE_URL+"/request/send/"+status+"/" + userId,{},{withCredentials:true})
        console.log(data)
        setshowtoast(true);
        notifyMessage.current="Interested"
        dispatch(removeFeed());
        setTimeout(()=>{
          setshowtoast(false)
        },1000)
      }
      catch(error){
        console.log(error)
      }
    }

  return (
    <div className='w-[100%] h-[100%] min-h-[100vh]'>
          {(!feed || feed.length===0) ?
          <div className='text-center   min-h-[100vh]'>
              <span className="loading loading-spinner loading-xs"></span>
              <span className="loading loading-spinner loading-sm"></span>
              <span className="loading loading-spinner loading-md"></span>
              <span className="loading loading-spinner loading-lg"></span>
          </div> :
            <UserCard userdetails={feed[0]} handleInterest={handleInterest}/>
          }

        {showtoast && <div className="toast toast-top toast-center">
            <div className={notifyMessage.current==="Interested"? "alert alert-info":"alert alert-warning"}>
            <span ref={notifyMessage} className='text-xl'>{notifyMessage?.current}</span>
          </div>
        </div>}
          
          

    </div>
  )
  
}

export default Feed