import React, { useEffect, useState } from 'react';

import styles from './page.module.css';

import { CountryList } from '../components/country-list';
import { loadCountries } from '../services/api';

export const ListPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCountryInfo = async () => {
    setLoading(true);
    try {
      const countries = await loadCountries();
      setData(countries);
    } finally {
      setLoading(false);
    }
  };

  useEffect(
    () => {
      loadCountryInfo();
    },
    []
  );

  const content = loading ? (
    'loading'
  ) : data && data.length ? (
    <CountryList countries={data} />
  ) : null;

  return (
    <div className={styles.vertical_padding}>
      <header className={styles.horizontal_padding}>
        <h1>List of Nobel laureates</h1>
      </header>
      {content}
    </div>
  );
};