import styles from './LogoContainer.module.css';
import Logo from '../../../ui/Logo/Logo';
import smallLogo from '../../../../assets/small-logo.svg';

const LogoContainer = ({ collapsed }) => {
  return (
    <div className={`${styles.logoContainer} ${collapsed ? styles.logoContainerCollapsed : ''}`}>
            {collapsed
        ? <img src={smallLogo} alt="MiseOS" className={styles.smallLogo} />
        : <Logo />
      }
    </div>
  );
};

export default LogoContainer;
