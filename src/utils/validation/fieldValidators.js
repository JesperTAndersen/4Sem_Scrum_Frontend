import fieldConfig from "./config/fieldconfig";

import {
  validateRequired,
  validateMinLength,
  validateMaxLength,
  validateNumberRange,
} from "./validators";

const SAFE_TEXT_REGEX = /^[\p{L}0-9\s&,.\-():]*$/u;

export const validateField = (entity, field, value) => {
  const config = fieldConfig[entity]?.[field];

  if (!config) return "";

  if (config.type === "number") {
    return (
      validateRequired(String(value ?? "")) ||
      validateNumberRange(value, config.min, config.max)
    );
  }

  const trimmed = String(value ?? "").trim();

  const requiredError = validateRequired(trimmed);

  if (requiredError) return requiredError;

  const minError = validateMinLength(trimmed, config.min);

  if (minError) return minError;

  const maxError = validateMaxLength(trimmed, config.max);

  if (maxError) return maxError;

  if (!SAFE_TEXT_REGEX.test(trimmed)) {
    return "Ugyldige tegn";
  }

  return "";
};
