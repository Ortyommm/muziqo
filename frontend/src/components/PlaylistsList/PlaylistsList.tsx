import PlaylistCard from "./components/PlaylistCard";
import PlaylistItem from "./components/PlaylistItem";
import { IPlaylist } from "@/types/PlaylistsTypes";
import AppList from "@/components/AppList/AppList";

export default function PlaylistsList({
  isFetching,
  items,
  useCard = false,
}: {
  isFetching: boolean;
  items: IPlaylist[];
  useCard?: boolean;
}) {
  return (
    <AppList
      isFetching={isFetching}
      items={items}
      Element={useCard ? PlaylistCard : PlaylistItem}
    />
  );
}
