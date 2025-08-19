import { useState, type FC } from 'react';
import styles from './PriceCalculator.module.css';

const PAGES = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '10',
  '15',
  '20',
  '25',
  '50',
  '75',
  '100',
  '150',
  '200',
  '250',
  '500',
  '1,000',
  '1,500',
  '2,000',
  '2,500',
  '5,000',
  '7,500',
  '10,000+',
];
const SEATS = ['1', '2', '3', '4', '5', '10', '15', '20', '25', '30', '40', '50', '75', '100+'];

const PAGES_PRICE = 1;
const SEATS_PRICE = 3;

export const PriceCalculator: FC = () => {
  const [pages, setPages] = useState(0);
  const [seats, setSeats] = useState(0);

  const pagesProgress = (pages / (PAGES.length - 1)) * 100;
  const seatsProgress = (seats / (SEATS.length - 1)) * 100;

  const effectivePages = parseInt(PAGES[pages].replace(/\D/g, ''), 10);
  const effectiveSeats = parseInt(SEATS[seats].replace(/\D/g, ''), 10);

  const proPrice = Math.max(29 + (effectivePages - 30) * PAGES_PRICE + (effectiveSeats - 3) * SEATS_PRICE, 29);
  const businessPrice = Math.max(99 + (effectivePages - 100) * PAGES_PRICE, 99);

  const price = effectivePages <= 1 && effectiveSeats <= 1 ? 0 : Math.min(proPrice, businessPrice);
  const plan = price === 0 ? 'Free' : price === businessPrice ? 'Business' : 'Pro';

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
            <p className={styles.indicator}>{PAGES[0]} pages</p>
            <p className={styles.indicator}>{PAGES[22]} pages</p>
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
            <p className={styles.indicator}>{SEATS[0]} seats</p>
            <p className={styles.indicator}>{SEATS[13]} seats</p>
          </div>
        </div>
      </div>
      <div className={styles.plan}>
        <h3 className={styles.planTitle}>{plan} Plan</h3>
        <div className={styles.planPrice}>
          <p className={styles.planPriceAmount}>${price.toFixed(2)}</p>
          <p className={styles.planPriceInterval}>&nbsp;/ mo</p>
        </div>
      </div>
    </section>
  );
};
