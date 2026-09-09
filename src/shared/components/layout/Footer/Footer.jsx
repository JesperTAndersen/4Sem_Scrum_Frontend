import { Link } from 'react-router-dom';
import classes from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footerInner}>
        <p>© 2026 MiseOS. All rights reserved.</p>
        
        <div className={classes.links}>
          <Link to="#">Support</Link>
          <Link to="#">Privatlivspolitik</Link>
          <Link to="#">Vilkår</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;