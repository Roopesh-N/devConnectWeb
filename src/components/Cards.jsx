import React from 'react'

const Cards = ({userDetails}) => {
    const {firstName, lastName, gender, about, age, photoUrl}=userDetails;

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
      <button className="btn btn-primary">connect</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Cards