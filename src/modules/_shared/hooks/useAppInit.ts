import { useEffect, useState } from "react";
import { initApp } from "@/app/bootstrap/initApp";

export const useAppInit = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;
    initApp().finally(() => {
      if (isMounted) {
        setIsReady(true);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return { isReady };
};
