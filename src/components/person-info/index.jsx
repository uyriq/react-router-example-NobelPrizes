import React, { useMemo, Fragment } from 'react';

import styles from './person-info.module.css';

import Avatar from '../avatar';

const PersonInfo = ({ person }) => {
  const fullName = useMemo(() => `${person.firstname} ${person.surname}`, [
    person.firstname,
    person.surname
  ]);

  const hasAffiliations = affiliations => affiliations.length > 0 && affiliations[0].city;

  return (
    <>
      <h1>{fullName}</h1>
      <div className={styles.details}>
        <Avatar {...person} className={styles.image} />
        <div>
          <h2>Facts</h2>
          <ul>
            <li className={styles.row}>
              <p className={styles.row_title}>Name:</p>
              <p>{fullName}</p>
            </li>
            <li className={styles.row}>
              <p className={styles.row_title}>Born:</p>
              <p>{`${person.born}, ${person.bornCity}, ${
                person.bornCountryCode
              }, ${person.bornCountry}`}</p>
            </li>
            {person.prizes.map(({ year, category, affiliations, motivation, share }, index) => (
              <Fragment key={index}>
                <li className={styles.row}>
                  <p className={styles.row_title}>{year}</p>
                </li>
                <li className={styles.row}>
                  <p className={styles.row_title}>Category:</p>
                  <p>The Nobel Prize in {category}</p>
                </li>
                {hasAffiliations(affiliations) ? (
                  <li className={styles.row}>
                    <p className={styles.row_title}>Affiliation at the time of the award:</p>
                    {affiliations.map(({ name, city, country }, index) => (
                      <p key={index}>
                        {name}, {city}, {country}
                      </p>
                    ))}
                  </li>
                ) : null}
                <li className={styles.row}>
                  <p className={styles.row_title}>Prize motivation:</p>
                  <p>{motivation}</p>
                </li>
                <li className={styles.row}>
                  <p className={styles.row_title}>Prize share:</p>
                  <p>{share}</p>
                </li>
              </Fragment>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PersonInfo;