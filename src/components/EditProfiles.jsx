import { useState } from "react";
import { UserCard } from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

export const EditProfiles = ({user}) => {
    const [firstName,setFirstName]=useState(user.firstName);
      const [lastName,setLastName]=useState(user.lastName);
      const [age,setAge]=useState(user.age);
      const [gender,setGender]=useState(user.gender);
      const [about,setAbout]=useState(user.about);
      const [photoUrl,setPhotoUrl]=useState(user.photoUrl);
      const [error,setError]=useState();
      const dispatch=useDispatch();

      const saveProfile=async ()=>{
        try{
            const res=await axios.patch(
                BASE_URL+"/profile/edit",
                {
                    firstName,
                    lastName,
                    age,
                    gender,
                    about,
                    photoUrl
                },
                {
                    withCredentials:true,
                }
            );
            dispatch(addUser(res.data))
        }
        catch(err){
            setError(err.message);
        }
      }

   return (
    <div className="flex justify-center my-10">
    <div className="flex justify-center">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Edit Profile</h2>
          <div>
            <fieldset className="fieldset w-full max-w-xs my-2">
              <legend className="fieldset-legend">First Name:</legend>
              <input type="text" value={firstName} className="input" placeholder="Type here"  onChange={(e)=>setFirstName(e.target.value)}/>
              {/* <p className="label">Optional</p> */}
            </fieldset>
             <fieldset className="fieldset w-full max-w-xs my-2">
              <legend className="fieldset-legend">Last Name:</legend>
              <input type="text" value={lastName} className="input" placeholder="Type here"  onChange={(e)=>setLastName(e.target.value)}/>
              {/* <p className="label">Optional</p> */}
            </fieldset>
             <fieldset className="fieldset w-full max-w-xs my-2">
              <legend className="fieldset-legend">Age:</legend>
              <input type="text" value={age} className="input" placeholder="Type here"  onChange={(e)=>setAge(e.target.value)}/>
              {/* <p className="label">Optional</p> */}
            </fieldset>
             <fieldset className="fieldset w-full max-w-xs my-2">
              <legend className="fieldset-legend">Gender:</legend>
              <input type="text" value={gender} className="input" placeholder="Type here"  onChange={(e)=>setGender(e.target.value)}/>
              {/* <p className="label">Optional</p> */}
            </fieldset>
             <fieldset className="fieldset w-full max-w-xs my-2">
              <legend className="fieldset-legend">About:</legend>
              <input type="text" value={about} className="input" placeholder="Type here"  onChange={(e)=>setAbout(e.target.value)}/>
              {/* <p className="label">Optional</p> */}
            </fieldset>
            <fieldset className="fieldset w-full max-w-xs my-2">
              <legend className="fieldset-legend">PhotoUrl:</legend>
              <input type="text" value={photoUrl} className="input" placeholder="Type here"  onChange={(e)=>setPhotoUrl(e.target.value)}/>
              {/* <p className="label">Optional</p> */}
            </fieldset>
           
          </div>
          <p className='text-red-500'>{}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
          </div>
        </div>
      </div>
      
    </div>
    <UserCard user={{firstName,lastName,age,gender,about,photoUrl}}></UserCard>
    </div>
  );
}
