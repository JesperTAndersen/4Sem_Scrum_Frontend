import styles from "./UserDetailPage.module.css";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { useNotification } from "../../../../context/NotificationContext";
import userService from "../../services/userService";
import UserDetail from "../../components/UserDetail/UserDetail";
import Card from "../../../../components/ui/Card/Card";
import PageHeader from "@/shared/components/layout/PageHeader/PageHeader";
import Button from "@/shared/components/ui/Button/Button";
import ConfirmDialog from "@/shared/components/ui/ConfirmDialog/ConfirmDialog";
import { formatUserRole } from "@/shared/utils/formatters";
import RoleSelect from "../../components/RoleSelect/RoleSelect";
import LoadingSpinner from "@/shared/components/ui/LoadingSpinner/LoadingSpinner";

const UserDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [activeAction, setActiveAction] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);
  const { notify } = useNotification();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const data = await userService.getById(id);
        setUser(data);
      } catch (error) {
        notify("error", error.message || "Kunne ikke hente bruger.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [id, notify]);

  const handleDelete = async () => {
    try {
      await userService.remove(user.id);
      navigate("/admin/users", {
        state: {
          successMessage: `${user.firstName} ${user.lastName} blev slettet`,
        },
      });
    } catch (error) {
      notify("error", error.message || "Kunne ikke slette brugeren.");
    }
  };

  const handleAssignRole = async () => {
    if (!selectedValue) {
      notify("error", "Vælg en rolle");
      return;
    }

    try {
      const data = await userService.assignRole(user.id, {
        userRole: selectedValue,
      });
      setUser(data);
      notify(
        "success",
        `${data.firstName} ${data.lastName} blev tildelt rollen: ${formatUserRole(data.userRole)}`,
      );
    } catch (error) {
      notify(
        "error",
        error.message || "Kunne ikke tilknytte rollen til brugeren",
      );
    } finally {
      setActiveAction(null);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <PageHeader
        title="Brugerprofil"
        subtitle="Detaljer og rettigheder for brugeren"
      />

      <div className={styles.contentWrapper}>
        <Card variant="flat">
          {isLoading || !user ? (
            <LoadingSpinner text="Henter bruger information..." inline />
          ) : (
            <>
              <UserDetail user={user}>
                <Button
                  variant="danger"
                  name="Slet bruger"
                  onClick={() => setShowConfirm(true)}
                />
                <div className={styles.positiveActions}>
                  <Button
                    variant="secondary"
                    name="Skift rolle"
                    onClick={() => {
                      setSelectedValue(user.userRole);
                      setActiveAction("ROLE");
                    }}
                    disabled={activeAction === "ROLE"}
                  />
                </div>
              </UserDetail>
            </>
          )}
        </Card>

        {activeAction === "ROLE" && (
          <Card variant="flat">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAssignRole();
              }}
            >
              <div className={styles.actionCardHeader}>
                <h3 className={styles.actionTitle}>
                  Vælg ny rolle til {user.firstName}
                </h3>
              </div>

              <RoleSelect value={selectedValue} onChange={setSelectedValue} />

              <div className={styles.actionsGroup}>
                <Button
                  variant="secondary"
                  type="button"
                  name="Fortryd"
                  onClick={() => setActiveAction(null)}
                />
                <Button
                  variant="primary"
                  type="submit"
                  name="Gem rolle"
                  disabled={!selectedValue}
                />
              </div>
            </form>
          </Card>
        )}

        {showConfirm && (
          <ConfirmDialog
            message={`Slet "${user.firstName} ${user.lastName}"?`}
            onConfirm={() => {
              handleDelete();
              setShowConfirm(false);
            }}
            onCancel={() => setShowConfirm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default UserDetailPage;
