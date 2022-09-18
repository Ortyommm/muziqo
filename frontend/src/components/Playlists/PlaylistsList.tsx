import AppList from "../AppList/AppList";
import PlaylistItem from "./PlaylistItem";
import { IPlaylist } from "../../types/PlaylistsTypes";
import { api } from "../../utils/api";

export default function PlaylistsList({
  isFetching,
  items,
  songId,
  onClose,
}: {
  isFetching: boolean;
  items: IPlaylist[];
  songId: number;
  onClose: () => void;
}) {
  type ItemWithOnClick = IPlaylist & { onClick: (songId: number) => void };

  const itemsWithOnClick: ItemWithOnClick[] = items.map((item) => {
    const itemWithOnClick = { ...item } as ItemWithOnClick;
    itemWithOnClick.onClick = () => {
      const data = { songId, playlistId: item.id };
      api.post(`playlists/song`, data);
      onClose();
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
