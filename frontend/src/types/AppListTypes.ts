import { ListOnScrollProps } from "react-window";
import { Dispatch, ElementType, SetStateAction } from "react";

export interface IExtendedListOnScrollProps extends ListOnScrollProps {
  scrollPercent: number;
}

export type LoadMoreItems = (
  startIndex: number,
  stopIndex: number
) => Promise<void> | void;

export interface IAppListProps extends ICertainListProps {
  Element: ElementType;
}

export interface ICertainListProps {
  isFetching: boolean;
  items: { id: number; [key: string]: any }[];
  loadMoreItems?: LoadMoreItems;
  height?: number;
}
