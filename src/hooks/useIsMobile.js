import { useState, useEffect } from 'react';

/**
 * useIsMobile — returns true when viewport width < breakpoint (default 768px)
 * Updates live on window resize.
 */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);

  return isMobile;
}

/**
 * useIsTablet — returns true when viewport width < 1024px
 */
export function useIsTablet(breakpoint = 1024) {
  const [isTablet, setIsTablet] = useState(() => window.innerWidth < breakpoint);

  useEffect(() => {
    const check = () => setIsTablet(window.innerWidth < breakpoint);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);

  return isTablet;
}
