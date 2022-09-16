import { PropsWithChildren } from "react";
import { ListItem } from "@mui/material";

export default function AppListItem(props: PropsWithChildren<any>) {
  return (
    <ListItem
      sx={{
        background: (theme) => theme.palette.grey.A700,
        height: 70,
        mb: 0.5,
      }}
      {...props}
    />
  );
}
