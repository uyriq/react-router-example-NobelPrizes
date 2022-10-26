import React, { memo, useState } from 'react';

import styles from './prizes.module.css';

const Prize = ({ category, motivation, year, index }) => (
  <>
    {index !== undefined && (<p className={styles.label}>Prize #{index + 1}</p>)}
    <p className={styles.info}>
      <span>Category: </span>The Nobel Prize in {category} {year}
    </p>
    <p className={styles.info}>
      <span>Prize motivation: </span>
      {motivation}
    </p>
  </>
);

export const Prizes = memo(({ prizes }) => {
  const [showPrizes, setShowPrizes] = useState(false);

  const openPrizes = event => {
    event.preventDefault();
    setShowPrizes(!showPrizes);
  };

  return prizes.length > 1 ? (
    <div className={styles.wrapper}>
      {showPrizes ? prizes.map((prize, index) => <Prize {...prize} key={index} index={index} />) : <Prize {...prizes[0]} />}
      <p className={styles.more} onClick={openPrizes}>
        {showPrizes ? 'Show less' : `Show +${prizes.length - 1} more prizes`}
      </p>
    </div>
  ) : (
    <Prize {...prizes[0]} />
  );
});