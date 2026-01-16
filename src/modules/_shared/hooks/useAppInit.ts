import { useEffect, useState } from "react";
import { initApp } from "@/app/bootstrap/initApp";

export const useAppInit = () => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    let active = true;
    initApp().then(() => {
      if (active) {
        setInitialized(true);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  return { initialized };
};
