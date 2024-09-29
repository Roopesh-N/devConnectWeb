import axios from "axios"
import { BASE_URL } from "../constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addRequests, removeRequests } from "../utils/requestSlice"
import ReqCard from "./ReqCard"

const Requests = () => {

    const requests=useSelector((store)=>store.requests)
    const dispatch=useDispatch()
    // console.log(requests)
    const fetchRequest=async()=>{
        // if(requests) return;
        try{
            const {data}=await axios.get(BASE_URL+"/user/requests/received",{withCredentials:true})
            // console.log(data?.data);
            dispatch(addRequests(data?.data))
        }catch(error){
            console.log(error)
        }
    }


    const handleRequest=async(status,reqId)=>{
        try{   
            await axios.post(BASE_URL+"/request/review/"+status+"/"+reqId,{},{withCredentials:true})
            dispatch(removeRequests(reqId))
        }catch(error){
            console.log(error)
        }

    }

    useEffect(()=>{
        fetchRequest();
    },[])

    if(!requests)return ;
    if(requests.length===0) return <div className="min-h-[100vh] text-center text-xl"><p>No requests!!</p></div>
  return (
    <div className="text-center min-h-[100vh]">
        <h2>Connections!!</h2>
        <div className="w-[50%] m-auto">

        {requests && requests.map((conn)=>{
            return (
                <ReqCard key={conn._id } reqId={conn._id } userdetails={{...conn?.fromUserId}} handleRequest={handleRequest} />
            )
        })}
        </div>
    </div>
  )
}

export default Requests