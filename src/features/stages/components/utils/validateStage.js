import { validateField } from "@/utils/validation/fieldValidators";

export const validateCompetence = (formData) => {
  const errors = {
    name: validateField("stage", "name", formData.name),
  };

  const hasErrors = Object.values(errors).some(Boolean);

  return { errors, hasErrors };
};
