import * as React from 'react';
import { useRouteMatch, Link  } from 'react-router-dom';
import styles from './laureate-list.module.css';

import Avatar from '../avatar';
import { Prizes } from './prizes';

const LaureateList = ({ laureates }) => {
const {  path  } = useRouteMatch();
  return laureates.length > 0 ? (
    <ul>
      
      {laureates.map(({ id, firstname, surname, prizes }) => (
      <Link 
                  className={styles.link}
                  to={ `${path}/${id}` }        
                        >
        <li key={id}> 
          <Avatar firstname={firstname} surname={surname} className={styles.avatar} />
          <div>
            <h3>
              {firstname} {surname}
            </h3>
            <Prizes prizes={prizes} />
          </div>
          
        </li>
          </Link>
      ))}
    </ul>
  ) : (
    <p className={styles.empty}>No results were found</p>
  );
};

export default LaureateList;