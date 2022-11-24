import UserItem from "./components/UserItem";
import AppList from "@/components/AppList/AppList";
import { ICertainListProps } from "@/types/AppListTypes";

export default function UsersList(props: ICertainListProps) {
  return <AppList {...props} Element={UserItem} />;
}
