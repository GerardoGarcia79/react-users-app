import { Result } from "../types/api-response";
import { User } from "../types/user";

export const userMapper = (user: Result): User => {
  return {
    id: user.login.uuid,
    name: user.name.first + " " + user.name.last,
    email: user.email,
    address: `${user.location.street.name} ${user.location.street.number}, ${user.location.city}, ${user.location.state}, ${user.location.country}.`,
    age: user.dob.age,
    cell: user.cell,
    picture: user.picture.medium,
  };
};
