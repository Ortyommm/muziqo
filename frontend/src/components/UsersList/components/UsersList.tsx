import UserItem from "./UserItem";
import { IUser } from "../../../types/UserTypes";
import AppList from "../../AppList/AppList";

export default function UsersList({
  users,
  isFetching = false,
}: {
  users: IUser[];
  isFetching?: boolean;
}) {
  return <AppList isFetching={isFetching} items={users} Element={UserItem} />;
}
