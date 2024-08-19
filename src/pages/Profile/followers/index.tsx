import { useEffect, useState } from "react";
import { IUser } from "../../../helpers/types";
import { getFollowers } from "../../../helpers/api";
import { Link } from "react-router-dom";
import { BASE, DEF } from "../../../helpers/default";

export const Followers = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    getFollowers().then((response) => {
      setUsers(response.payload as IUser[]);
    });
  }, []);

  return (
    <div className="row">
      {users.map((user) => (
        <div key={user.id} className="col-md-3">
          <img
            className="profile-pic"
            src={user.picture ? BASE + user.picture : DEF}
          />
          <p>
            {user.name} {user.surname}
          </p>
          <Link to={"/profile/" + user.id}>account</Link>
        </div>
      ))}
    </div>
  );
};
