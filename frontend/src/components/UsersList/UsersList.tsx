import UserItem from "./UserItem";
import { IUser } from "../../types/UserTypes";
import AppList from "../AppList/AppList";

export default function UsersList({ users }: { users: IUser[] }) {
  return <AppList isFetching={false} items={users} Element={UserItem} />;
}
