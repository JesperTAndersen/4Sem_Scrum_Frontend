import {
  validateRequired,
  validateEmail,
  validatePassword,
  validatePasswordMatch,
  validateMaxLength,
  validateMinLength,
} from '../../../utils/validation/validators';

export const validateRegistration = (formData) => {
  const errors = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  errors.firstName =
    validateRequired(formData.firstName) ||
    validateMinLength(formData.firstName, 2) ||
    validateMaxLength(formData.firstName, 40);

  errors.lastName =
    validateRequired(formData.lastName) ||
    validateMinLength(formData.lastName, 2) ||
    validateMaxLength(formData.lastName, 40);

  errors.email =
    validateRequired(formData.email) || validateEmail(formData.email);

  errors.password =
    validateRequired(formData.password) || validatePassword(formData.password);

  errors.confirmPassword = validatePasswordMatch(
    formData.password,
    formData.confirmPassword,
  );

  const hasErrors = Object.values(errors).some(Boolean);

  return {
    errors,
    hasErrors,
  };
};

export const validateChangePassword = (formData) => {
  const errors = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  errors.currentPassword = validateRequired(formData.currentPassword);

  errors.newPassword =
    validateRequired(formData.newPassword) ||
    validatePassword(formData.newPassword);

  errors.confirmPassword = validatePasswordMatch(
    formData.newPassword,
    formData.confirmPassword,
  );

  const hasErrors = Object.values(errors).some(Boolean);

  return {
    errors,
    hasErrors,
  };
};
