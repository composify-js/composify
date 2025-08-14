import { useState, type FC } from 'react';
import styles from './PriceCalculator.module.css';

const REQUESTS_MAX = 10000000;
const SEATS_MAX = 100;

export const PriceCalculator: FC = () => {
  const [requests, setRequests] = useState(10000);
  const [seats, setSeats] = useState(1);

  const requestsProgress = (requests / REQUESTS_MAX) * 100;
  const seatsProgress = (seats / SEATS_MAX) * 100;

  return (
    <section className={styles.priceCalculator}>
      <div className={styles.calculator}>
        <div className={styles.header}>
          <p className={styles.title}>Page Views</p>
          <p className={styles.usage}>{requests.toLocaleString()} / month</p>
        </div>
        <input
          type="range"
          step={100000}
          min={0}
          max={REQUESTS_MAX}
          value={requests}
          className={styles.rangeInput}
          onChange={e => setRequests(Number(e.target.value))}
          style={{ '--progress': `${requestsProgress}%` } as React.CSSProperties}
        />
        <div className={styles.indicatorGroup}>
          <p className={styles.indicator}>0</p>
          <p className={styles.indicator}>2.5M</p>
          <p className={styles.indicator}>5M</p>
          <p className={styles.indicator}>7.5M</p>
          <p className={styles.indicator}>10M+</p>
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
    </section>
  );
};
