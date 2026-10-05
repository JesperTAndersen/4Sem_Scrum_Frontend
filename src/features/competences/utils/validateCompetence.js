import { validateField } from "@/utils/validation/fieldValidators";

export const validateCompetence = (formData) => {
  const errors = {
    name: validateField("competence", "name", formData.name),
    rate: validateField("competence", "rate", formData.rate),
  };

  const hasErrors = Object.values(errors).some(Boolean);

  return { errors, hasErrors };
};
