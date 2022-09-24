import { ListOnScrollProps } from "react-window";

export interface IExtendedListOnScrollProps extends ListOnScrollProps {
  scrollPercent: number;
}

export type LoadMoreItems = (
  startIndex: number,
  stopIndex: number
) => Promise<void> | void;
