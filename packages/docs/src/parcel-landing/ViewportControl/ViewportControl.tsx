import { type FC, useCallback, useEffect, useRef, useState } from 'react';
import styles from './ViewportControl.module.css';

const DEFAULT_VIEWPORTS = [
  {
    width: 425,
    label: 'Mobile - 425px',
    initial: true,
  },
  {
    width: 768,
    label: 'Tablet - 768px',
  },
  {
    width: 1024,
    label: 'Laptop - 1024px',
  },
  {
    width: 1440,
    label: 'Desktop - 1440px',
  },
  {
    width: 2560,
    label: '4K - 2560px',
  },
];

export const ViewportControl: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [selectedWidth, setSelectedWidth] = useState(768);

  const autoScale = useCallback(() => {
    if (!containerRef.current) {
      return;
    }

    const container = containerRef.current;
    const box = container.getBoundingClientRect();

    const widths = DEFAULT_VIEWPORTS.map((v) => v.width);
    const nextWidthCandidate = Math.min(...widths.filter((v) => v > selectedWidth));
    const nextWidth = Math.min(nextWidthCandidate, Math.max(...widths));

    const scale = Math.min(box.width / nextWidth, 1) * (nextWidth === nextWidthCandidate ? 1.05 : 1);

    setScale(scale);
  }, [selectedWidth]);

  useEffect(() => {
    requestAnimationFrame(autoScale);
  }, [autoScale]);

  useEffect(() => {
    window.addEventListener('resize', autoScale);

    return () => window.removeEventListener('resize', autoScale);
  }, [autoScale]);

  return (
    <div ref={containerRef} className={styles.container}>
      {DEFAULT_VIEWPORTS.sort((a, b) => b.width - a.width).map((viewport) => (
        <button
          type="button"
          key={viewport.width}
          className={styles.item}
          style={{ width: viewport.width * scale }}
          onClick={() => setSelectedWidth(viewport.width)}
        >
          <div className={styles.highlight} />
          <span className={styles.label}>{viewport.label}</span>
        </button>
      ))}
    </div>
  );
};
