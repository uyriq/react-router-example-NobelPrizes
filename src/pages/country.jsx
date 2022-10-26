import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import styles from './page.module.css';
import LaureateList from '../components/laureate-list';
import { loadLaureates, loadCountries } from '../services/api';

export const CountryPage = () => {
  const [laureates, setLaureates] = useState([]);
  const [countryTitle, setCountryTitle] = useState('');

  const { country } = useParams();

  const loadCountryInfo = useCallback(
    () => {
      loadCountries().then(countries => {
        const currentCountry = countries.find(({ code }) => code === country);
        setCountryTitle(currentCountry && currentCountry.name ? currentCountry.name : country);
      });
    },
    [country]
  );

  const loadAllCountryLaureates = useCallback(
    () => {
      loadLaureates().then(laureates => {
        const countryLaureates = laureates.filter(
          ({ bornCountryCode }) => bornCountryCode === country
        );
        setLaureates(countryLaureates);
      });
    },
    [country]
  );

  useEffect(
    () => {
      loadCountryInfo();
      loadAllCountryLaureates();
    },
    [country, loadCountryInfo, loadAllCountryLaureates]
  );

  return (
    <div className={styles.vertical_padding}>
      <header className={styles.horizontal_padding}>
        <h1>{countryTitle}</h1>
      </header>
      <LaureateList laureates={laureates} />
    </div>
  );
};