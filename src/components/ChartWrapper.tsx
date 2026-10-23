import { ReactNode, useEffect, useRef, useState } from 'react';

interface ChartWrapperProps {
  children: ReactNode;
  height?: number;
  className?: string;
}

export default function ChartWrapper({ children, height = 250, className = '' }: ChartWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Ensure container has dimensions before rendering chart
    const checkDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setIsReady(true);
        }
      }
    };

    // Check immediately
    checkDimensions();

    // Also check after a short delay
    const timer = setTimeout(checkDimensions, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`w-full ${className}`}
      style={{ height: `${height}px`, minHeight: `${height}px` }}
    >
      {isReady ? children : (
        <div className="flex items-center justify-center h-full text-gray-400 text-sm">
          Loading chart...
        </div>
      )}
    </div>
  );
}
