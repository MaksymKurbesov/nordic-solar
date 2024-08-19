import { useEffect, useState } from "react";

const useWindowSize = (): any => {
  const [windowSize, setWindowSize] = useState<any>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (windowSize.width == 0) {
      setWindowSize({ width: window.outerWidth, height: window.outerHeight });
    }

    const windowSizeHandler = () => {
      setWindowSize({ width: window.outerWidth, height: window.outerHeight });
    };
    window.addEventListener("resize", windowSizeHandler);

    return () => {
      window.removeEventListener("resize", windowSizeHandler);
    };
  }, [windowSize.width]);

  return windowSize;
};

export default useWindowSize;
