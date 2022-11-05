import AppList from "../../AppList/AppList";
import { IAuthor } from "../../../types/SongsTypes";
import { ICertainListProps, LoadMoreItems } from "../../../types/AppListTypes";
import AuthorItem from "./AuthorItem";

export default function AuthorList(props: ICertainListProps) {
  return <AppList {...props} Element={AuthorItem} />;
}
