import { PropsWithChildren } from "react";
import { ListItem } from "@mui/material";
import { omit } from "lodash-es";

export default function AppListItem(props: PropsWithChildren<any>) {
  return (
    <div style={{ ...props.style, marginBottom: "4px" }}>
      <ListItem
        sx={{
          background: (theme) => theme.palette.grey.A700,
          height: 70,
          borderRadius: 1,
        }}
        {...omit(props, "style")}
      />
    </div>
  );
}
