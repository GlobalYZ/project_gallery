import { useState, useEffect } from "react";

const useWindowSize = () => {
  // Initialize state with null to avoid initial calculation
  const [windowSize, setWindowSize] = useState(null);

  useEffect(() => {
    // Define the handler
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial size
    handleResize();

    // Add event listener with debounce
    let timeoutId;
    const debouncedHandler = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", debouncedHandler);

    // Cleanup
    return () => {
      window.removeEventListener("resize", debouncedHandler);
      clearTimeout(timeoutId);
    };
  }, []);

  // Return default values if state is null
  return (
    windowSize || {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  );
};

export default useWindowSize;
