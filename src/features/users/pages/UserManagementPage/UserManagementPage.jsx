import { useEffect, useState } from "react";
import { useNotification } from "@/context/NotificationContext";
import { useLocation, useNavigate, useOutletContext } from "react-router";
import styles from "./UserManagementPage.module.css";
import TableSearch from "@/shared/components/filter/TableSearch/TableSearch";
import TableEmptyState from "@/shared/components/ui/TableEmptyState/TableEmptyState";
import LoadingSpinner from "@/shared/components/ui/LoadingSpinner/LoadingSpinner";
import PageHeader from "@/shared/components/layout/PageHeader/PageHeader";
import Card from "@/shared/components/ui/Card/Card";
import RoleFilter from "@/shared/components/filter/RoleFilter/RoleFilter";
import userService from "../../services/userService";
import UsersTable from "../../components/UsersTable/UsersTable";

const UserManagementPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { notify } = useNotification();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState({
    search: "",
    role: "ALL",
  });

  useEffect(() => {
    if (location.state?.successMessage) {
      notify("success", location.state.successMessage);
      window.history.replaceState({}, "");
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const data = await userService.getAll();
        setUsers(data);
      } catch (error) {
        notify(
          "error",
          error.message || "Noget gik galt ved henting af brugerene",
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleOnView = (id) => {
    navigate(`/admin/users/${id}`);
  };

  const handleFilterChange = (key, value) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  const resetSearch = () => handleFilterChange("search", "");

  const filteredUsers = users
    .filter((u) => {
      const search = filter.search.toLowerCase();

      const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();

      return (
        fullName.includes(search) || u.email.toLowerCase().includes(search)
      );
    })
    .filter((u) => filter.role === "ALL" || u.userRole === filter.role);

  return (
    <div className={styles.pageContainer}>
      <PageHeader
        title="Brugeradministration"
        subtitle="Administrer brugere og roller"
      />

      <Card variant="table">
        <div className={styles.cardHeader}>
          <TableSearch
            value={filter.search}
            onChange={(value) => handleFilterChange("search", value)}
            placeholder="Søg efter navn eller email"
          />

          <div className={styles.filterGroup}>
            <RoleFilter
              value={filter.role}
              onChange={(value) => handleFilterChange("role", value)}
            />
          </div>
        </div>

        <div className={styles.tableCount}>
          Viser {filteredUsers.length}{" "}
          {filteredUsers.length === 1 ? "bruger" : "brugere"}
          {filteredUsers.length !== users.length && ` (ud af ${users.length})`}
        </div>

        {isLoading ? (
          <LoadingSpinner text="Henter brugere..." inline />
        ) : (
          <>
            <UsersTable users={filteredUsers} onView={handleOnView} />
            {filteredUsers.length === 0 && (
              <TableEmptyState
                text="Ingen brugere matcher din søgning."
                onReset={resetSearch}
              />
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default UserManagementPage;
