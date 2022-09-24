import CircleCenterProgress from "../Progress/CircularCenterProgress";
import * as React from "react";
import {
  ElementType,
  LegacyRef,
  PropsWithChildren,
  ReactElement,
  useRef,
} from "react";
import {
  FixedSizeList,
  ListChildComponentProps,
  ListOnItemsRenderedProps,
  ListOnScrollProps,
} from "react-window";
import styles from "./AppList.module.scss";
import InfiniteLoader from "react-window-infinite-loader";
import { LoadMoreItems } from "../../types/AppListTypes";

export default function AppList({
  isFetching,
  items,
  Element,
  loadMoreItems,
}: {
  isFetching: boolean;
  items: { id: number; [key: string]: any }[];
  Element: ElementType;
  loadMoreItems?: LoadMoreItems;
}) {
  if (isFetching) {
    return <CircleCenterProgress />;
  }
  if (!items.length) return <>No items</>;

  if (items.length < 10) {
    return (
      <>
        {items.map((item) => (
          <Element key={item.id} {...item} />
        ))}
      </>
    );
  }

  function renderRow(props: ListChildComponentProps) {
    const item = props.data[props.index];
    return <Element key={item.id} {...item} style={props.style} />;
  }

  const FixedSizeListBase = ({
    onItemsRendered,
    ref,
  }: {
    onItemsRendered?: (props: ListOnItemsRenderedProps) => any;
    ref?: any;
  } = {}) => {
    return (
      <FixedSizeList
        height={740}
        itemCount={items.length}
        //height: 70, padding bottom: 4
        itemSize={74}
        width="100%"
        itemData={items}
        overscanCount={30}
        className={styles.list}
        onItemsRendered={onItemsRendered}
        ref={ref}
      >
        {renderRow}
      </FixedSizeList>
    );
  };

  if (loadMoreItems)
    return (
      <InfiniteLoader
        itemCount={items.length}
        isItemLoaded={() => false}
        loadMoreItems={loadMoreItems}
      >
        {FixedSizeListBase}
      </InfiniteLoader>
    );

  return <FixedSizeListBase />;
}
