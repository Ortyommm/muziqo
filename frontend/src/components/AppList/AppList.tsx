import CircleCenterProgress from "../Progress/CircularCenterProgress";
import * as React from "react";
import { ElementType, ReactElement } from "react";

export default function AppList({
  isFetching,
  items,
  Element,
}: {
  isFetching: boolean;
  items: { id: number; [key: string]: any }[];
  Element: ElementType;
}) {
  if (isFetching) {
    return <CircleCenterProgress />;
  }
  if (!items.length) return <>No items</>;

  return (
    <>
      {items.map((item) => (
        <Element key={item.id} {...item} />
      ))}
    </>
  );
}
