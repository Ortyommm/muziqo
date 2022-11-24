import { IPlaylist } from "@/types/PlaylistsTypes";
import { api } from "@/utils/api";
import PlaylistsList from "@/components/PlaylistsList/PlaylistsList";

export default function PlaylistsListModal({
  isFetching,
  items,
  songId,
  onClose,
}: {
  isFetching: boolean;
  items: IPlaylist[];
  songId: number;
  onClose: () => void;
  useCard?: boolean;
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
    <PlaylistsList
      isFetching={isFetching}
      items={itemsWithOnClick}
      useCard={false}
    />
  );
}
