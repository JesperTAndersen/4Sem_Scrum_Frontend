import { validateField } from "@/utils/validation/fieldValidators";

export const validateTask = (formData) => {
  const errors = {
    name: validateField("task", "name", formData.name),
    estimate: validateField("task", "estimate", formData.estimate),
    competenceIds: validateField(
      "task",
      "competenceIds",
      formData.competenceIds,
    ),
  };

  const hasErrors = Object.values(errors).some(Boolean);

  return { errors, hasErrors };
};
