import * as React from "react";

interface InfiniteScrollProps {
  isLoading: boolean;
  hasMore: boolean;
  next: () => unknown;
  threshold?: number;
  root?: Element | Document | null;
  rootMargin?: string;
  reverse?: boolean;
  children?: React.ReactNode;
}

export default function InfiniteScroll({
  isLoading,
  hasMore,
  next,
  threshold = 1,
  root = null,
  rootMargin = "0px",
  reverse,
  children,
}: InfiniteScrollProps) {
  const sentinelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!sentinelRef.current || isLoading) return;

    const safeThreshold = threshold < 0 || threshold > 1 ? 1 : threshold;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          next();
        }
      },
      { threshold: safeThreshold, root, rootMargin }
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [hasMore, isLoading, next, threshold, root, rootMargin]);

  return (
    <div className="relative">
      {children}
      <div ref={sentinelRef} className="h-1" style={{ visibility: "hidden" }} />
    </div>
  );
}
