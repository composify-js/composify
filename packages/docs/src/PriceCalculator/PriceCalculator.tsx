import { useState, type FC } from 'react';
import styles from './PriceCalculator.module.css';

const PAGES = ['1', '5', '10', '20', '30', '50', '100', '250', '500', '1000', '2500', '5000+'];
const SEATS = ['1', '2', '3', '5', '10', '15', '20', '30', '40', '50', '75', '100+'];

const PAGES_PRICE = 1;
const SEATS_PRICE = 3;

export const PriceCalculator: FC = () => {
  const [pages, setPages] = useState(1);
  const [seats, setSeats] = useState(1);

  const pagesProgress = (pages / (PAGES.length - 1)) * 100;
  const seatsProgress = (seats / (SEATS.length - 1)) * 100;

  const effectivePages = parseInt(PAGES[pages].replace(/\D/g, ''), 10);
  const effectiveSeats = parseInt(SEATS[seats].replace(/\D/g, ''), 10);

  const proPrice = Math.max(29 + (effectivePages - 30) * PAGES_PRICE + (effectiveSeats - 3) * SEATS_PRICE, 29);
  const businessPrice = Math.max(99 + (effectivePages - 100) * PAGES_PRICE, 99);

  const price = effectivePages <= 1 && effectiveSeats <= 1 ? 0 : Math.min(proPrice, businessPrice);

  return (
    <section className={styles.container}>
      <div className={styles.calculators}>
        <div className={styles.calculator}>
          <div className={styles.header}>
            <p className={styles.title}>Live Pages</p>
            <p className={styles.usage}>
              {PAGES[pages]} page{pages > 0 ? 's' : ''}
            </p>
          </div>
          <input
            type="range"
            step={1}
            min={0}
            max={PAGES.length - 1}
            value={pages}
            className={styles.rangeInput}
            onChange={e => setPages(Number(e.target.value))}
            style={{ '--progress': `${pagesProgress}%` } as React.CSSProperties}
          />
          <div className={styles.indicatorGroup}>
            <p className={styles.indicator}>{PAGES[0]}</p>
            <p className={styles.indicator}>{PAGES[3]}</p>
            <p className={styles.indicator}>{PAGES[7]}</p>
            <p className={styles.indicator}>{PAGES[11]}</p>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.calculator}>
          <div className={styles.header}>
            <p className={styles.title}>Editor seats</p>
            <p className={styles.usage}>
              {SEATS[seats]} seat{seats > 0 ? 's' : ''}
            </p>
          </div>
          <input
            type="range"
            step={1}
            min={0}
            max={SEATS.length - 1}
            value={seats}
            className={styles.rangeInput}
            onChange={e => setSeats(Number(e.target.value))}
            style={{ '--progress': `${seatsProgress}%` } as React.CSSProperties}
          />
          <div className={styles.indicatorGroup}>
            <p className={styles.indicator}>{SEATS[0]}</p>
            <p className={styles.indicator}>{SEATS[3]}</p>
            <p className={styles.indicator}>{SEATS[7]}</p>
            <p className={styles.indicator}>{SEATS[11]}</p>
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
