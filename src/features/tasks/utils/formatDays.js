const formatDays = (days) => {
  const value = days ?? 0;
  const formatted = value.toLocaleString("da-DK", { maximumFractionDigits: 1 });

  return `${formatted} ${value === 1 ? "dag" : "dage"}`;
};

export default formatDays;
