const formatHours = (hours) =>
  `${new Intl.NumberFormat("da-DK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(hours)} t`;

export default formatHours;
