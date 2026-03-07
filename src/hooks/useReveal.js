import { useEffect, useRef, useState } from 'react';

/**
 * useReveal — triggers once when the element enters the viewport.
 * @param {number} threshold  - 0..1, how much of the element must be visible (default 0.15)
 * @param {number} rootMargin - pixels to expand/contract the trigger zone (default '0px')
 */
export function useReveal(threshold = 0.15, rootMargin = '0px') {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect(); // fire once only
        }
      },
      { threshold, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);

  return [ref, visible];
}

/**
 * useStaggerReveal — returns an array of [ref, visible] for N children,
 * each triggering with a staggered delay once the parent enters viewport.
 * @param {number} count     - number of children
 * @param {number} baseDelay - ms delay for first item (default 0)
 * @param {number} step      - ms between each item (default 100)
 */
export function useStaggerReveal(count, baseDelay = 0, step = 100) {
  const parentRef = useRef(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = parentRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const delays = Array.from({ length: count }, (_, i) => baseDelay + i * step);
  return [parentRef, triggered, delays];
}
