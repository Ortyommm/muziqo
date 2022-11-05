import { useEffect, useState } from "react";

const useCalculatedHeight = (calculatedHeight: number) => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    setHeight(calculatedHeight);
    setTimeout(() => {
      document.body.style.overflowY = "auto";
    });
  }, []);

  return height;
};

export default useCalculatedHeight;
