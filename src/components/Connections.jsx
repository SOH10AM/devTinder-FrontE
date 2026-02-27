import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { useSelector } from "react-redux";

export const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fectchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      //
    }
  };
  useEffect(() => {
    fectchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0) return <h1>No connections found!!!</h1>;
  return (
    <div className="text-center center my-10">
      <h1 className="text-bold text-white text-4xl">Connections</h1>

      {connections.map((connection) => {
        const { firstName, lastName, gender, photoUrl, age ,about,_id} = connection;

        return (
          <div key={_id} className="flex m-4 p-4  rounded-lg bg-base-300 w-1/2 mx-auto">
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
          </div>
        );
      })}
    </div>
  );
};
