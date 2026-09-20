import { validateField } from "@/utils/validation/fieldValidators";

export const validateCompetence = (formData) => {
  const errors = {
    name: validateField("station", "name", formData.name),
    rate: validateField("station", "description", formData.description),
  };

  const hasErrors = Object.values(errors).some(Boolean);

  return { errors, hasErrors };
};
