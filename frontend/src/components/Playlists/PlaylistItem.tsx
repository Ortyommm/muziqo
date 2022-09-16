import AppListItem from "../AppList/AppListItem";

export default function PlaylistItem({
  name,
  id,
  onClick,
}: {
  name: string;
  id: number;
  onClick: (songId: number) => void;
}) {
  return (
    <AppListItem onClick={() => onClick(id)} button>
      {name}
    </AppListItem>
  );
}
