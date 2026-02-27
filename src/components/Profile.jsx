import { useSelector } from "react-redux";
import { EditProfiles } from "./EditProfiles";

export default function Profile() {
  const user=useSelector((store)=>store.user);
  return (
    
    <div><EditProfiles user={user}/></div>
  )
}
