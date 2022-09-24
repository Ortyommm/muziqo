import SongItem from "./SongItem";
import * as React from "react";
import { ISong } from "../../types/SongsTypes";
import AppList from "../AppList/AppList";
import { ListOnScrollProps } from "react-window";
import {
  IExtendedListOnScrollProps,
  LoadMoreItems,
} from "../../types/AppListTypes";

export default function SongsList({
  songs,
  isFetching,
  loadMoreItems,
}: {
  songs: ISong[];
  isFetching: boolean;
  loadMoreItems?: LoadMoreItems;
}) {
  return (
    <AppList
      isFetching={isFetching}
      items={songs}
      Element={SongItem}
      loadMoreItems={loadMoreItems}
    />
  );
}
