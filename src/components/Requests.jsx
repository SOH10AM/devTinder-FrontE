import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from './utils/constants';
import { addRequests, removeRequest } from './utils/requestSlice';
import { useEffect } from 'react';
import axios from 'axios';
// request
function Requests() {
    const requests=useSelector((store)=>store.requests);
        
    const dispatch=useDispatch();
    
    const reviewRequest=async (status,_id)=>{
      try{
        const res=axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{withCredentials:true})
        dispatch(removeRequest(_id));
      }
      catch(err){
        //
      }
    }

    const fetchRequests=async ()=>{
        try{
          if(requests)return;
            const req=await axios.get(BASE_URL+"/user/requests/received",{
                withCredentials:true,
            });
            dispatch(addRequests(req.data.data));
        }
        catch(err){
            // return err.message;
        }
    }
    useEffect(()=>{
        fetchRequests();
    },[]);
    console.log(requests);
  if (!requests) return;
  if (requests.length === 0) return <h1 className='flex justify-center my-10'>No connections found!!!</h1>;
  return (
    <div className="text-center center my-10">
      <h1 className="text-bold text-white text-4xl">Connections</h1>

      {requests.map((request) => {
        const { firstName, lastName, gender, photoUrl, age ,about,_id} = request.fromUserId;

        return (
          <div key={_id} className="flex justify-between items-center m-4 p-4  rounded-lg bg-base-300 w-1/2 mx-auto">
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full"
                src={photoUrl}
              ></img>
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + " " + gender}</p>}
              <p>{about}</p>
            </div>
            <div>
                <button className="btn btn-primary mx-2" onClick={()=>reviewRequest("rejected",request._id)}>Reject</button>
                <button className="btn btn-secondary mx-2" onClick={()=>reviewRequest("accepted",request._id)}>Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Requests;


