import UserItem from "./UserItem";
import { IUser } from "../../../types/UserTypes";
import AppList from "../../AppList/AppList";
import { ICertainListProps } from "../../../types/AppListTypes";

export default function UsersList(props: ICertainListProps) {
  return <AppList {...props} Element={UserItem} />;
}
