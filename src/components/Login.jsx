import  { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';

export const Login = () => {
  const [emailId,setmailId]=useState("abcde@gmail.com");
  const [password,setPassword]=useState("Noone12@1234");
  const [firstName,setFirstName]=useState("");
  const [lastName,setLastName]=useState("");
  const [isLogin,setIsLogin]=useState(false);
  const [error,setError]=useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleLogin=async()=>{
    try{
      const res=await axios.post(BASE_URL+"/login",{
        emailId,
        password,
      },{withCredentials:true});
      dispatch(addUser(res.data));
      return navigate("/");
    }
    catch(err){
      setError(err?.response?.data || "Something Went Wrong");
      console.error(err);
    }
  };

  const handleSignUp=async()=>{
    try{
      const res=await axios.post(BASE_URL+"/signup",
        {firstName,lastName,emailId,password},
        {withCredentials:true},
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    }
    catch(err){
      setError(err?.response?.data || "Something Went Wrong");
      console.error(err);
    }
  }

  return (
    <div className="flex justify-center">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">{isLogin?"Login":"SignUp"}</h2>
          <div>
             {!isLogin && <><fieldset className="fieldset w-full max-w-xs my-2">
              <legend className="fieldset-legend">First Name</legend>
              <input type="text" value={firstName} className="input" placeholder="Type here" onChange={(e)=>setFirstName(e.target.value)}/>
              {/* <p className="label">Optional</p> */}
            </fieldset>

             <fieldset className="fieldset w-full max-w-xs my-2">
              <legend className="fieldset-legend">Last Name</legend>
              <input type="text" value={lastName} className="input" placeholder="Type here" onChange={(e)=>setLastName(e.target.value)}/>
              {/* <p className="label">Optional</p> */}
            </fieldset></>} 

            <fieldset className="fieldset w-full max-w-xs my-2">
              <legend className="fieldset-legend">Email Id</legend>
              <input type="text" value={emailId} className="input" placeholder="Type here"  onChange={(e)=>setmailId(e.target.value)}/>
              {/* <p className="label">Optional</p> */}
            </fieldset>

            <fieldset className="fieldset w-full max-w-xs my-2">
              <legend className="fieldset-legend">Password</legend>
              <input type="text" value={password} className="input" placeholder="Type here" onChange={(e)=>setPassword(e.target.value)}/>
              {/* <p className="label">Optional</p> */}
            </fieldset>
          </div>
          <p className='text-red-500'>{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={isLogin?handleLogin:handleSignUp}>{isLogin?"Login":"Sign In"}</button>
          </div>

          <button className='cursor-pointer' onClick={()=>setIsLogin((value)=>!value)}>{isLogin? "New User? Sign  Up Here":
           "Existing Here? Login Here"}</button>
        </div>
      </div>
      
    </div>
  );
}
