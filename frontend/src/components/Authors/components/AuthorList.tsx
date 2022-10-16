import AppList from "../../AppList/AppList";
import { IAuthor } from "../../../types/SongsTypes";
import { LoadMoreItems } from "../../../types/AppListTypes";
import AuthorItem from "./AuthorItem";

export default function AuthorList({
  authors,
  isFetching,
  loadMoreItems,
}: {
  authors: IAuthor[];
  isFetching: boolean;
  loadMoreItems?: LoadMoreItems;
}) {
  return (
    <AppList
      Element={AuthorItem}
      isFetching={isFetching}
      items={authors}
      loadMoreItems={loadMoreItems}
    />
  );
}
