
import { useScrollToTop } from "@/hooks/useScrollToTop";

/**
 * A component that scrolls the window to the top when the route changes
 * To be used in the top level of the application
 */
const ScrollToTop = () => {
  useScrollToTop();
  return null;
};

export default ScrollToTop;
