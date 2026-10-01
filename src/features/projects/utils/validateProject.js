import { validateField } from "../../../utils/validation/fieldValidators";

export const validateProject = (formData) => {
  const errors = {
    title: validateField("project", "title", formData.title),
    description: validateField("project", "description", formData.description),
    startDate: formData.startDate ? "" : "Vælg en startdato",
    deadline: formData.deadline ? "" : "Vælg en slutdato",
  };

  if (
    formData.startDate &&
    formData.deadline &&
    new Date(formData.deadline) < new Date(formData.startDate)
  ) {
    errors.deadline = "Slutdato skal være efter startdato";
  }

  const hasErrors = Object.values(errors).some(Boolean);

  return { errors, hasErrors };
};
