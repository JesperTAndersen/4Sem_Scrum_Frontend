import styles from './Logo.module.css';
import logoImg from '../../../assets/logo.svg';

const Logo = ({ size = 'md', className = '' }) => {
  return (
    <img
      src={logoImg}
      alt="MiseOS Logo"
      className={`${styles.logo} ${styles[size]} ${className}`}
    />
  );
};

export default Logo;
