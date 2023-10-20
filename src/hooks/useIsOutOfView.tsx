import {useEffect, useRef, useState, useCallback} from 'react';

export function useIsOutOfView(ref: React.RefObject<HTMLElement>) {
  const [isOutOfView, setOutOfView] = useState(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = useCallback(() => {
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      if (ref.current) {
        const clientRect = ref.current.getBoundingClientRect();
        const isOut = clientRect.bottom < 0 || clientRect.top > window.innerHeight;
        setOutOfView(isOut);
      }
    }, 300);
  }, [timeout, ref]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
  return [isOutOfView];
}
