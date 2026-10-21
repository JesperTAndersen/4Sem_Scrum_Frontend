const calculateCostPerHour = (totalCost, totalHours) => {
  if (!totalHours) {
    return null;
  }

  return Math.round(totalCost / totalHours);
};

export default calculateCostPerHour;
