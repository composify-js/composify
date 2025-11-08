import { type FC, useCallback, useEffect, useRef, useState } from 'react';
import { HStack } from '../../preset';
import styles from './ViewportControl.module.css';

type Props = {
  viewports: {
    width: number;
    label: string;
  }[];
  selectedWidth: number;
  onClick: (width: number) => void;
};

export const ViewportControl: FC<Props> = ({ viewports, selectedWidth, onClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const autoScale = useCallback(() => {
    if (!containerRef.current) {
      return;
    }

    const container = containerRef.current;
    const box = container.getBoundingClientRect();

    const widths = viewports.map((v) => v.width);
    const nextWidthCandidate = Math.min(...widths.filter((v) => v > selectedWidth));
    const nextWidth = Math.min(nextWidthCandidate, Math.max(...widths));

    const scale = Math.min(box.width / nextWidth, 1) * (nextWidth === nextWidthCandidate ? 1.05 : 1);

    setScale(scale);
  }, [viewports, selectedWidth]);

  useEffect(() => {
    requestAnimationFrame(autoScale);
  }, [autoScale]);

  useEffect(() => {
    window.addEventListener('resize', autoScale);

    return () => window.removeEventListener('resize', autoScale);
  }, [autoScale]);

  return (
    <HStack ref={containerRef} alignHorizontal="center" alignVertical="center" className={styles.container}>
      {viewports
        .sort((a, b) => b.width - a.width)
        .map((viewport) => (
          <button
            type="button"
            key={viewport.width}
            className={styles.item}
            style={{ width: viewport.width * scale }}
            onClick={() => onClick(viewport.width)}
          >
            <div className={styles.highlight} />
            <span className={styles.label}>{viewport.label}</span>
          </button>
        ))}
    </HStack>
  );
};
