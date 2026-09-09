import styles from '../shared/AuthAction.module.css';
import { FiLogOut } from "react-icons/fi";

const LogOut = ( {onLogOut} ) => {
    return(
        <button 
        className={styles.actionButton}
        onClick={onLogOut}
        >
        <span>Log ud</span>
        <FiLogOut />    
        </button>
    )
};

export default LogOut;