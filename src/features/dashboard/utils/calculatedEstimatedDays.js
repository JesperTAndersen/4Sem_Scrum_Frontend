const calculateEstimatedDays = (hours) => {
  if (hours) {
    return Math.ceil(hours / 7.5);
  }
  return "Kan ikke udregne, da der er ikke timer";
};

export default calculateEstimatedDays;
