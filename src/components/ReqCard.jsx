import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../constants';

const ReqCard = ({reqId, userdetails, handleRequest }) => {
    const {firstName,lastName, age,gender,photoUrl,about}=userdetails;
    


  return (
    <div className=''>
    <div className="card card-side bg-base-100 shadow-xl h-72 my-10">
  <figure>
    <img
      src={photoUrl}
      alt="profileImg" 
      />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName+" "+lastName}</h2>
    <p>{about}</p>
    {age  && gender && <p>{age +", "+gender}</p>}
    <div className="card-actions justify-end">
      <button className="btn btn-warning" onClick={()=>handleRequest("rejected",reqId)}>Reject</button>
      <button className="btn btn-success text-white" onClick={()=>handleRequest("accepted",reqId)}>Accept</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default ReqCard