
import { useEffect } from "react";

/**
 * Simplified hook for logging screen state changes
 */
const useScreenDebugger = (screenState: string) => {
  useEffect(() => {
    console.log("[useScreenDebugger] Current screen:", screenState);
  }, [screenState]);
};

export default useScreenDebugger;
