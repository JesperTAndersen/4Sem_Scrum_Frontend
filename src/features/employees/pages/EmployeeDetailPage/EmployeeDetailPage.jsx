import styles from "./EmployeeDetailPage.module.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useNotification } from "@/context/NotificationContext";
import employeeService from "../../services/employeeService";
import EmployeeDetail from "../../components/EmployeeDetail/EmployeeDetail";
import EmployeeEditForm from "../../components/EmployeeEditForm/EmployeeEditForm";
import EmployeeCompetenceForm from "../../components/EmployeeCompetenceForm/EmployeeCompetenceForm";
import competenceService from "@/features/competences/services/competenceService";
import PageHeader from "@/shared/components/layout/PageHeader/PageHeader";
import Card from "@/shared/components/ui/Card/Card";
import Button from "@/shared/components/ui/Button/Button";
import ConfirmDialog from "@/shared/components/ui/ConfirmDialog/ConfirmDialog";
import LoadingSpinner from "@/shared/components/ui/LoadingSpinner/LoadingSpinner";

const EmployeeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notify } = useNotification();
  const [employee, setEmployee] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingCompetences, setIsEditingCompetences] = useState(false);
  const [competences, setCompetences] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await employeeService.getById(id);
        setEmployee(data);
      } catch (error) {
        notify("error", error.message || "Kunne ikke hente medarbejder");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchCompetences = async () => {
      try {
        const data = await competenceService.getAll();
        setCompetences(data);
      } catch (error) {
        notify("error", error.message || "Kunne ikke hente kompetencer");
      }
    };

    fetchCompetences();
  }, []);

  const handleDelete = async () => {
    try {
      await employeeService.remove(id);
      navigate("/employees", {
        state: {
          successMessage: `${employee.firstName} ${employee.lastName} blev slettet`,
        },
      });
    } catch (error) {
      notify("error", error.message || "Kunne ikke slette medarbejderen.");
    }
  };

  const handleUpdate = async (formData) => {
    try {
      const updated = await employeeService.update(employee.id, formData);
      setEmployee(updated);
      notify("success", `${updated.firstName} ${updated.lastName} opdateret!`);
      setIsEditing(false);
    } catch (error) {
      notify("error", error.message || "Kunne ikke opdatere medarbejderen.");
      throw error;
    }
  };

  const handleUpdateCompetences = async (competenceIds) => {
    try {
      const updated = await employeeService.updateCompetences(
        employee.id,
        competenceIds,
      );
      setEmployee(updated);
      notify("success", "Kompetencer opdateret!");
      setIsEditingCompetences(false);
    } catch (error) {
      notify("error", error.message || "Kunne ikke opdatere kompetencer.");
    }
  };

  const handleDeactivate = async () => {
    try {
      await employeeService.deActivate(id);

      setEmployee((prev) => ({
        ...prev,
        active: false,
      }));

      notify("success", `${employee.firstName} ${employee.lastName} deaktiveret!`);
    } catch (error) {
      notify("error", error.message || "Kunne ikke deaktivere medarbejderen.");
    }
  };

  const handleActivate = async () => {
    try {
      await employeeService.activate(id);

      setEmployee((prev) => ({
        ...prev,
        active: true,
      }));

      notify("success", `${employee.firstName} ${employee.lastName} aktiveret!`);
    } catch (error) {
      notify("error", error.message || "Kunne ikke aktivere medarbejderen.");
    }
  };

  return (
    <div className={styles.pageContainer}>
      {isLoading || !employee ? (
        <LoadingSpinner text="Henter medarbejder..." inline />
      ) : (
        <>
          <PageHeader
            title={`${employee.firstName} ${employee.lastName}`}
            subtitle="Detaljer og administration af medarbejder"
          />

          <div className={styles.contentWrapper}>
            <Card variant="flat">
              {isEditing ? (
                <EmployeeEditForm
                  employee={employee}
                  onSubmit={handleUpdate}
                  onCancel={() => setIsEditing(false)}
                />
              ) : isEditingCompetences ? (
                <EmployeeCompetenceForm
                  employee={employee}
                  competences={competences}
                  onSubmit={handleUpdateCompetences}
                  onCancel={() => setIsEditingCompetences(false)}
                />
              ) : (
                <EmployeeDetail
                  employee={employee}
                  onEditCompetences={() => setIsEditingCompetences(true)}
                  actions={{
                    left: (
                      <Button
                        variant="danger"
                        name="Slet medarbejder"
                        onClick={() => setShowConfirm(true)}
                      />
                    ),

                    right: (
                      <>
                        {employee.active ? (
                          <Button
                            variant="secondary"
                            name="Deaktiver medarbejder"
                            onClick={handleDeactivate}
                          />
                        ) : (
                          <Button
                            variant="primary"
                            name="Aktiver medarbejder"
                            onClick={handleActivate}
                          />
                        )}

                        <Button
                          variant="secondary"
                          name="Rediger medarbejder"
                          onClick={() => setIsEditing(true)}
                        />
                      </>
                    ),
                  }}
                />
              )}
            </Card>

            {showConfirm && (
              <ConfirmDialog
                message={`Slet "${employee.firstName} ${employee.lastName}"?`}
                onConfirm={() => {
                  handleDelete();
                  setShowConfirm(false);
                }}
                onCancel={() => setShowConfirm(false)}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeDetailPage;
