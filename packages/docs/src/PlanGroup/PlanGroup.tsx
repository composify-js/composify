import { type FC } from 'react';
import { PlanItem } from '../PlanItem';
import styles from './PlanGroup.module.css';

export const PlanGroup: FC = () => (
  <section className={styles.planGroup}>
    <div className={styles.plans}>
      <PlanItem
        title="Free"
        description="Proof of concept, at no cost."
        price="$0"
        interval="&nbsp;/ mo"
        features={[
          { label: '1 Live Page' },
          { label: '1 Editor Seat' },
          { label: 'Unlimited Bandwidth' },
          { label: 'Unlimited Page Views' },
        ]}
      />
      <PlanItem
        title="Pro"
        description="Everything you need to build and grow."
        price="$29"
        interval="&nbsp;/ mo + usage"
        features={[
          { label: '30 Live Pages', caption: '+ then $1 per page' },
          { label: '3 Editor Seats', caption: '+ then $3 per seat' },
          { label: 'Unlimited Bandwidth' },
          { label: 'Unlimited Page Views' },
          { label: 'Real-time Collaboration' },
          { label: 'Version History with Time-travel', planned: true },
        ]}
        recommended={true}
      />
      <PlanItem
        title="Business"
        description="Unlock the full potential of your team."
        price="$99"
        interval="&nbsp;/ mo + usage"
        features={[
          { label: '100 Live Pages', caption: '+ then $1 per page' },
          { label: 'Unlimited Editor Seats' },
          { label: 'Unlimited Bandwidth' },
          { label: 'Unlimited Page Views' },
          { label: 'Real-time Collaboration' },
          { label: 'Version History with Time-travel', planned: true },
          { label: 'Templates for Repeated Patterns', planned: true },
        ]}
      />
    </div>
    <small className={styles.caption}>* Features shown in gray are planned for upcoming releases.</small>
  </section>
);
