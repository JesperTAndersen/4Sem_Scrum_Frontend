export const validateRequired = (value) => {
  if (!value.trim()) {
    return "Feltet er påkrævet";
  }

  return "";
};

export const validateMinLength = (value, min) => {
  if (value.trim().length < min) {
    return `Minimum ${min} tegn`;
  }

  return "";
};

export const validateMaxLength = (value, max) => {
  if (value.trim().length > max) {
    return `Max ${max} tegn`;
  }

  return "";
};

export const validateNumberRange = (value, min, max) => {
  const number = Number(value);

  if (Number.isNaN(number)) {
    return "Skal være et tal";
  }

  if (number < min) {
    return `Minimum værdi er ${min}`;
  }

  if (number > max) {
    return `Maksimum værdi er ${max}`;
  }

  return "";
};

export const validateEmail = (value) => {
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!EMAIL_REGEX.test(value)) {
    return "Indtast en gyldig email adresse";
  }

  return "";
};

export const validatePassword = (password) => {
  if (!password || password.length < 8) {
    return "Adgangskoden skal være mindst 8 tegn";
  }

  if (!/[A-Z]/.test(password)) {
    return "Adgangskoden skal indeholde mindst ét stort bogstav";
  }

  if (!/[0-9]/.test(password)) {
    return "Adgangskoden skal indeholde mindst ét tal";
  }

  return "";
};

export const validatePasswordMatch = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return "Passwords matcher ikke";
  }

  return "";
};
