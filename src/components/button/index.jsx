import styles from './button.module.css';

export const Button = ({ primary, secondary, ...props }) => {
  return (
    <button {...props} className={primary ? styles.primary : styles.secondary}>
      {props.children}
    </button>
  );
};