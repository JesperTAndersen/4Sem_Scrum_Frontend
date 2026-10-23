const calculateEstimatedDays = (hours, dailyCapacity) => {
  if (!dailyCapacity) {
    return null;
  }

  return Math.ceil(hours / dailyCapacity);
};

export default calculateEstimatedDays;
