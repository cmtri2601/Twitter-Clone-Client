import { useEffect, useRef } from 'react';

/**
 * Hook custom for useEffect, make effect don't run twice when component render first time
 * @param effect
 * @param deps
 */
export function useDidUpdateEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList
) {
  // At first, component is mounting. But after initial render component is mounted
  const isMountingRef = useRef(true);

  useEffect(() => {
    if (!isMountingRef.current) {
      effect();
    } else {
      // Trigger at initial render
      isMountingRef.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
