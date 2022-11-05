import CircleCenterProgress from "../Progress/CircularCenterProgress";
import * as React from "react";
import {
  FixedSizeList,
  ListChildComponentProps,
  ListOnItemsRenderedProps,
} from "react-window";
import styles from "./AppList.module.scss";
import InfiniteLoader from "react-window-infinite-loader";
import { IAppListProps } from "../../types/AppListTypes";
import { Divider } from "@mui/material";

export default function AppList({
  isFetching,
  items,
  Element,
  loadMoreItems,
  height,
}: IAppListProps) {
  if (isFetching) {
    return <CircleCenterProgress />;
  }
  if (!items.length) return <>No items</>;

  return (
    <>
      <Divider />
      <AppListWithItems
        Element={Element}
        loadMoreItems={loadMoreItems}
        height={height}
        items={items}
      />
    </>
  );
}

function AppListWithItems({
  items,
  loadMoreItems,
  height,
  Element,
}: Omit<IAppListProps, "isFetching">) {
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
        height={height || 740}
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
        isItemLoaded={(index: number) => false}
        loadMoreItems={loadMoreItems}
        threshold={10}
      >
        {FixedSizeListBase}
      </InfiniteLoader>
    );

  return <FixedSizeListBase />;
}
