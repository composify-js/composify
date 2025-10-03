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
  '300',
  '400',
  '500',
  '750',
  '1,000+',
];
const MEMBERS = ['1', '2', '3', '4', '5', '10', '15', '20', '25', '30', '40', '50', '75', '100+'];

const PAGES_PRICE = 1;
const MEMBERS_PRICE = 5;

export const PriceCalculator: FC = () => {
  const [pages, setPages] = useState(0);
  const [members, setMembers] = useState(0);

  const pagesProgress = (pages / (PAGES.length - 1)) * 100;
  const membersProgress = (members / (MEMBERS.length - 1)) * 100;

  const effectivePages = parseInt(PAGES[pages].replace(/\D/g, ''), 10);
  const effectiveSeats = parseInt(MEMBERS[members].replace(/\D/g, ''), 10);

  const proPrice =
    29 + Math.max((effectivePages - 30) * PAGES_PRICE, 0) + Math.max((effectiveSeats - 3) * MEMBERS_PRICE, 0);
  const businessPrice = 99 + Math.max((effectivePages - 100) * PAGES_PRICE, 0);

  const price = effectivePages <= 1 && effectiveSeats <= 1 ? 0 : Math.min(proPrice, businessPrice);
  const plan = price === 0 ? 'Free' : price === businessPrice ? 'Business' : 'Pro';

  return (
    <section className={styles.container}>
      <div className={styles.calculators}>
        <div className={styles.calculator}>
          <div className={styles.header}>
            <p className={styles.title}>Pages</p>
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
            <p className={styles.indicator}>{PAGES[PAGES.length - 1]} pages</p>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.calculator}>
          <div className={styles.header}>
            <p className={styles.title}>Members</p>
            <p className={styles.usage}>
              {MEMBERS[members]} member{members > 0 ? 's' : ''}
            </p>
          </div>
          <input
            type="range"
            step={1}
            min={0}
            max={MEMBERS.length - 1}
            value={members}
            className={styles.rangeInput}
            onChange={e => setMembers(Number(e.target.value))}
            style={{ '--progress': `${membersProgress}%` } as React.CSSProperties}
          />
          <div className={styles.indicatorGroup}>
            <p className={styles.indicator}>{MEMBERS[0]} members</p>
            <p className={styles.indicator}>{MEMBERS[MEMBERS.length - 1]} members</p>
          </div>
        </div>
      </div>
      <div className={styles.plan}>
        <h3 className={styles.planTitle}>{plan} Plan</h3>
        <div className={styles.planPrice}>
          <p className={styles.planPriceAmount}>
            ${price.toFixed(2)}
            {pages === PAGES.length - 1 ? '+' : ''}
          </p>
          <p className={styles.planPriceInterval}>&nbsp;/ mo</p>
        </div>
      </div>
    </section>
  );
};
