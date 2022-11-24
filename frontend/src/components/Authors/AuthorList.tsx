import { ICertainListProps } from "@/types/AppListTypes";
import AuthorItem from "./components/AuthorItem";
import AppList from "@/components/AppList/AppList";

export default function AuthorList(props: ICertainListProps) {
  return <AppList {...props} Element={AuthorItem} />;
}
