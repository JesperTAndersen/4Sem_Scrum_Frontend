import styles from "./UsersTable.module.css";
import { FiChevronRight } from "react-icons/fi";
import Avatar from "@/shared/components/ui/Avatar/Avatar";
import { formatUserRole } from "@/utils/formatters";

const UsersTable = ({ users, onView }) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Navn</th>
            <th>Rolle</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className={styles.row} onClick={() => onView(u.id)}>
              <td>
                <div className={styles.nameCell}>
                  <Avatar
                    firstName={u?.firstName}
                    lastName={u?.lastName}
                    size="sm"
                  />
                  <span className={styles.name}>
                    {u.firstName} {u.lastName}
                  </span>
                </div>
              </td>
              <td>{formatUserRole(u.userRole)}</td>
              <td>{u.email}</td>
              <td>
                <FiChevronRight className={styles.chevron} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
