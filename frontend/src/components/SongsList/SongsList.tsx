import SongItem from "./SongItem";
import * as React from "react";
import AppList from "../AppList/AppList";
import { ICertainListProps } from "../../types/AppListTypes";

export default function SongsList(props: ICertainListProps) {
  return <AppList {...props} Element={SongItem} />;
}
