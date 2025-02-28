import { User } from "../types/user";

interface Props {
  users: User[];
}

const UserList = ({ users }: Props) => {
  return (
    <div className="user-list-container">
      <h2 className="title">UserList</h2>
      <table>
        <thead>
          <th>Name</th>
          <th>Email</th>
          <th>Address</th>
          <th></th>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="user-list-item">
              <td>
                <p className="name">{user.name}</p>
                <p className="email mobile-only">{user.email}</p>
              </td>
              <td>
                <p className="email tablet">{user.email}</p>
                <p className="address mobile-only">{user.address}</p>
                <button className="btn-primary mobile-only">Show More</button>
              </td>
              <td className="tablet">
                <p>{user.address}</p>
              </td>
              <td className="tablet">
                <button className="btn-primary">Show More</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
