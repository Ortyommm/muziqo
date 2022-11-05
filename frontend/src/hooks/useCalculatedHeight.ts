import { useEffect, useState } from "react";

const useCalculatedHeight = (
  calculatedHeight: number,
  //For caching
  localStorageKey: string
) => {
  const cachedHeight = Number(localStorage.getItem(localStorageKey));
  const [height, setHeight] = useState(isNaN(cachedHeight) ? 0 : cachedHeight);

  useEffect(() => {
    if (cachedHeight === calculatedHeight) return;

    localStorage.setItem(localStorageKey, calculatedHeight.toString());
    document.body.style.overflowY = "hidden";
    setHeight(calculatedHeight);
    setTimeout(() => {
      document.body.style.overflowY = "auto";
    });
  }, []);

  return height;
};

export default useCalculatedHeight;
