import styles from './input.module.css'

export const Input = ({ icon: Icon, onIconClick, value, placeholder, onChange, type, ...props }) => {
    const icon = Icon ? <Icon onClick={onIconClick} className={styles.inputContainer} /> : null
    return (
        <div className={styles.inputContainer}>
            <input
                className={styles.input}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                {...props}
            />
            {icon}
        </div>
    )
}
