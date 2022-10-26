import React, { useMemo } from 'react';
import cn from 'classnames';

import styles from './avatar.module.css';

const Avatar = ({ firstname, surname, className = '' }) => {
  // image mock
  const initials = useMemo(() => (firstname && surname ? `${firstname[0]} ${surname[0]}` : ''), [
    firstname,
    surname
  ]);

  return (
    <div className={cn(styles.avatar, className)}>
      <div className={styles.initials}>{initials}</div>
    </div>
  );
};

export default Avatar;