const calculateCostPerHour = (totalCost, remaningHours) => {
  if (totalCost && remaningHours) {
    return Math.ceil(totalCost / remaningHours);
  }

  return "Kan ikke udregne da nogen af værdier er 0";
};

export default calculateCostPerHour;
