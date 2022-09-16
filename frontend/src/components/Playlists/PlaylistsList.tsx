import AppList from "../AppList/AppList";
import PlaylistItem from "./PlaylistItem";
import { IPlaylist } from "../../types/PlaylistsTypes";
import { useState } from "react";
import { addSongToPlaylist } from "../../store/modules/playlists";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../store";

export default function PlaylistsList({
  isFetching,
  items,
  songId,
}: {
  isFetching: boolean;
  items: IPlaylist[];
  songId: number;
}) {
  type ItemWithOnClick = IPlaylist & { onClick: (songId: number) => void };

  const dispatch = useAppDispatch();

  const itemsWithOnClick: ItemWithOnClick[] = items.map((item) => {
    const itemWithOnClick = { ...item } as ItemWithOnClick;
    itemWithOnClick.onClick = () => {
      dispatch(addSongToPlaylist(songId, item.id));
    };
    return itemWithOnClick;
  });

  return (
    <AppList
      isFetching={isFetching}
      items={itemsWithOnClick}
      Element={PlaylistItem}
    />
  );
}
