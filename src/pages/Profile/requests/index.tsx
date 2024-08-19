import { useEffect, useState } from "react";
import { IUser } from "../../../helpers/types";
import { requests, requestAccept, requestDecline } from "../../../helpers/api";
import { Link } from "react-router-dom";
import { BASE, DEF } from "../../../helpers/default";

export const Requests = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    requests().then((response) => {
      if (Array.isArray(response.payload)) {
        const userData = response.payload.map(
          (item: { user: IUser }) => item.user
        );
        setUsers(userData);
      }
    });
  }, []);

  const handleAccept = (id: number | undefined) => {
    if (id !== undefined) {
      requestAccept(id).then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      });
    }
  };

  const handleDecline = async (id: number | undefined) => {
    if (id !== undefined) {
      await requestDecline(id).then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      });
    }
  };

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
          <div>
            <button onClick={() => handleAccept(user.id)}>Accept</button>
            <button onClick={() => handleDecline(user.id)}>Decline</button>
          </div>
        </div>
      ))}
    </div>
  );
};
