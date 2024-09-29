

const UserCard = ({userdetails, handleInterest}) => {
    const {_id,firstName,lastName, age,gender,photoUrl,about}=userdetails;
  return (
    <div className='flex flex-row justify-around my-5 h-[90vh]'>
        <div className="card bg-base-300 w-96 shadow-xl">
  <figure >
    <img
      src={photoUrl}
      alt="profileImg" 
      className='w-[100%] h-[100%]'/>
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName+" "+lastName}</h2>
    <div className='flex justify-start'>
        {age && <span>{age +" years,"}</span>}
        {gender && <span>{""+gender}</span>}
    </div>
    <p>{about}</p>
    <div className="card-actions justify-center">
      {handleInterest && 
      <div>
        <button className="btn btn-primary" onClick={()=>handleInterest("ignored",_id)}>Ignore ❌</button>
         <button className="btn btn-secondary bg-red-400" onClick={()=>handleInterest("interested",_id)}>Interested 💖</button>
      </div>
      }
    </div>
  </div>
</div>
    </div>
  )
}

export default UserCard