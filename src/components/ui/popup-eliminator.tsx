
import { useEffect } from 'react';

const PopupEliminator = () => {
  useEffect(() => {
    // Function to remove white popup elements
    const removeWhitePopups = () => {
      // Target common white popup selectors
      const selectors = [
        '[data-radix-portal] > div:empty',
        '[data-radix-portal] > div[style*="background: white"]:not([role])',
        '[data-radix-portal] > div[style*="background-color: white"]:not([role])',
        '[data-radix-portal] > div[style*="background: #fff"]:not([role])',
        '[data-radix-portal] > div[style*="background-color: #fff"]:not([role])',
        'button[style*="background: white"]:not([data-component])',
        'button[style*="background-color: white"]:not([data-component])',
        '.radix-toast-viewport > div:empty',
        '.radix-dialog-overlay:empty',
        '.radix-popover-content:empty'
      ];

      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          (element as HTMLElement).style.display = 'none';
          (element as HTMLElement).style.visibility = 'hidden';
          (element as HTMLElement).style.opacity = '0';
          element.remove();
        });
      });
    };

    // Run immediately
    removeWhitePopups();

    // Set up observer for dynamic content
    const observer = new MutationObserver(() => {
      removeWhitePopups();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    // Also run periodically as a fallback
    const interval = setInterval(removeWhitePopups, 1000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return null;
};

export default PopupEliminator;
