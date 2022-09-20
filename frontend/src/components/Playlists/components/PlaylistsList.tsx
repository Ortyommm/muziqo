import PlaylistCard from "./PlaylistCard";
import PlaylistItem from "./PlaylistItem";
import AppList from "../../AppList/AppList";
import { IPlaylist } from "../../../types/PlaylistsTypes";

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
