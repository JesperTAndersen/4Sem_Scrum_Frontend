import styles from "./DishCreateForm.module.css";
import Input from "@/shared/components/ui/Input/Input";
import Textarea from "@/shared/components/ui/Input/Textarea";
import Button from "@/shared/components/ui/Button/Button";
import FormLayout from "@/shared/components/layout/FormLayout/FormLayout";
import Card from "@/shared/components/ui/Card/Card";
import DayRangePicker from "@/shared/components/filter/DateRangePicker/DateRangePicker";
import { useState } from "react";
import { validateField } from "@/utils/validation/fieldValidators";
import { useNotification } from "@/context/NotificationContext";

const emptyProject = {
  title: "",
  description: "",
  startDate: "",
  deadline: "",
};

const ProjectCreateForm = ({ onSubmit, onCancel }) => {
  const { notify } = useNotification();
  const [project, setProject] = useState(emptyProject);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState(emptyProject);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      nameDA: validateField("suggestion", "nameDA", project.nameDA),
      descriptionDA: validateField(
        "suggestion",
        "descriptionDA",
        project.descriptionDA,
      ),
      stationId: !project.stationId ? "Vælg en station" : "",
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;

    try {
      setIsSubmitting(true);
      await onSubmit(project);
      notify("success", `${project.title} oprettet!`);
      onCancel();
    } catch (error) {
      notify("error", error.message || "Kunne ikke oprette projekt");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.contentWrapper}>
      <Card variant="flat">
        <div className={styles.cardHeader}>
          <h2>Nyt Projekt</h2>
        </div>

        <FormLayout onSubmit={handleSubmit}>
          <Input
            label="Rettens titel"
            type="text"
            name="title"
            value={project.nameDA}
            onChange={handleChange}
            placeholder="Fx. Villa nord"
            hasError={!!errors.title}
            errorMessage={errors.title}
          />

          <Textarea
            label="Projekts beskrivelse"
            name="description"
            value={project.description}
            onChange={handleChange}
            placeholder="Fx: Indedørs renovering af 90er villa"
            hasError={!!errors.description}
            errorMessage={errors.description}
            maxLength={200}
          />

          <DayRangePicker
            startDate={project.startDate}
            endDate={project.deadline}
            onChange={({ startDate, endDate }) => {
              setProject((prev) => ({
                ...prev,
                startDate,
                deadline: endDate,
              }));
            }}
          />

          <div className={styles.actions}>
            <Button onClick={onCancel} variant="secondary" name="Fortryd" />

            <Button
              type="submit"
              variant="primary"
              name={isSubmitting ? "Gemmer projekt...." : "Opret"}
            />
          </div>
        </FormLayout>
      </Card>
    </div>
  );
};

export default ProjectCreateForm;
