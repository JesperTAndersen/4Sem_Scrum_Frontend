import { validateField } from "@/utils/validation/fieldValidators";

export const validateTask = (formData) => {
  const errors = {
    name: validateField("task", "name", formData.name),

    bestEstimate: validateField("task", "bestEstimate", formData.bestEstimate),
    likelyEstimate: validateField("task", "likelyEstimate", formData.likelyEstimate),
    worstEstimate: validateField("task", "worstEstimate", formData.worstEstimate),

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
