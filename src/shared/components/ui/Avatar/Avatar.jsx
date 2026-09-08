import styles from './Avatar.module.css';

const Avatar = ({ firstName = '', lastName = '', size = 'md' }) => {
  const first = firstName ? firstName.charAt(0).toUpperCase() : '';
  const last = lastName ? lastName.charAt(0).toUpperCase() : '';

  return (
    <div className={`${styles.avatar} ${styles[size]}`}>
      {first}
      {last}
    </div>
  );
};

export default Avatar;
