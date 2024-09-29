import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BASE_URL } from "../constants"
import { addConnections } from "../utils/connectionSlice"
import Cards from "./Cards"


const Connections = () => {
    const connections=useSelector((store)=>store.connections)
    const dispatch=useDispatch();
    // console.log(connections);
    const fetchConnections=async()=>{
        // if(connections) return;
        try{
            const {data}=await axios.get(BASE_URL+"/user/connections",{withCredentials:true})
            dispatch(addConnections(data?.data))
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchConnections()
    });

    if(!connections)return;
    if(connections.length===0) return <h2 className="font-semibold text-xl min-h-[100vh] text-center">No Connections yet!!</h2>

  return (
    <div className="text-center min-h-[100vh]">
        <h2 className="font-semibold text-xl">Connections!!</h2>
        <div className="w-[50%] m-auto">

        {connections && connections.map((conn)=>{
            
            return (
                <Cards key={conn._id } userDetails={{...conn}}/>
            )
        })}

        </div>
    </div>
  )
}

export default Connections