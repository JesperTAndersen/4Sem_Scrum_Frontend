import { validateField } from "@/utils/validation/fieldValidators";

export const validateTask = (formData) => {
  const errors = {
    name: validateField("task", "name", formData.name),

    estimate: validateField("task", "estimate", formData.estimate),

    minimumDurationInDays: validateField(
      "task",
      "minimumDurationInDays",
      formData.minimumDurationInDays,
    ),

    competenceId: validateField("task", "competenceId", formData.competenceId),
  };

  const hasErrors = Object.values(errors).some(Boolean);

  return { errors, hasErrors };
};
