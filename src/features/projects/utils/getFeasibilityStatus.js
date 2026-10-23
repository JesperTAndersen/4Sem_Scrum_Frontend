const getFeasibilityStatus = (schedule) => {
  if (schedule?.feasible === true) {
    return "FEASIBLE";
  }

  if (schedule?.feasible === false) {
    return "INFEASIBLE";
  }

  return "UNDETERMINED";
};

export default getFeasibilityStatus;
