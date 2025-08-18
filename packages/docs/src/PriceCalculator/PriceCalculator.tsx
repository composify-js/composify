import { useState, type FC } from 'react';
import styles from './PriceCalculator.module.css';

const PAGES_MAX = 1000;
const SEATS_MAX = 100;

export const PriceCalculator: FC = () => {
  const [pages, setPages] = useState(1);
  const [seats, setSeats] = useState(1);

  const pagesProgress = (pages / PAGES_MAX) * 100;
  const seatsProgress = (seats / SEATS_MAX) * 100;

  const price = Math.max((pages - 1) * 1 + (seats - 1) * 5, 0);

  return (
    <section className={styles.priceCalculator}>
      <div className={styles.calculatorGroup}>
        <div className={styles.calculator}>
          <div className={styles.header}>
            <p className={styles.title}>Live Pages</p>
            <p className={styles.usage}>
              {pages.toLocaleString()} page{pages !== 1 ? 's' : ''}
            </p>
          </div>
          <input
            type="range"
            step={1}
            min={1}
            max={PAGES_MAX}
            value={pages}
            className={styles.rangeInput}
            onChange={e => setPages(Number(e.target.value))}
            style={{ '--progress': `${pagesProgress}%` } as React.CSSProperties}
          />
          <div className={styles.indicatorGroup}>
            <p className={styles.indicator}>0</p>
            <p className={styles.indicator}>250</p>
            <p className={styles.indicator}>500</p>
            <p className={styles.indicator}>750</p>
            <p className={styles.indicator}>1000+</p>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.calculator}>
          <div className={styles.header}>
            <p className={styles.title}>Editors</p>
            <p className={styles.usage}>
              {seats.toLocaleString()} seat{seats !== 1 ? 's' : ''}
            </p>
          </div>
          <input
            type="range"
            step={1}
            min={1}
            max={SEATS_MAX}
            value={seats}
            className={styles.rangeInput}
            onChange={e => setSeats(Number(e.target.value))}
            style={{ '--progress': `${seatsProgress}%` } as React.CSSProperties}
          />
          <div className={styles.indicatorGroup}>
            <p className={styles.indicator}>0</p>
            <p className={styles.indicator}>25</p>
            <p className={styles.indicator}>50</p>
            <p className={styles.indicator}>75</p>
            <p className={styles.indicator}>100+</p>
          </div>
        </div>
      </div>
      <div className={styles.plan}>
        <h3 className={styles.planTitle}>Pay as you go</h3>
        <div className={styles.planPrice}>
          <p className={styles.planPriceAmount}>${price.toFixed(2)}</p>
          <p className={styles.planPriceInterval}>&nbsp;/ mo</p>
        </div>
      </div>
    </section>
  );
};
