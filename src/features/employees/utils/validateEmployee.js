import { validateField } from "@/utils/validation/fieldValidators";

export const validateEmployee = (formData) => {
  const errors = {
    firstName: validateField("employee", "firstName", formData.firstName),
    lastName: validateField("employee", "lastName", formData.lastName),
    dailyCapacity: formData.standardCapacity
      ? ""
      : validateField("employee", "dailyCapacity", formData.dailyCapacity),
  };

  const hasErrors = Object.values(errors).some(Boolean);

  return { errors, hasErrors };
};
