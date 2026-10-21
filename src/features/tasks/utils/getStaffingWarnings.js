const WARNING_TEXTS = {
  INACTIVE_ASSIGNED_EMPLOYEE: "er inaktiv og tæller ikke med i kapaciteten",
  ASSIGNED_EMPLOYEE_MISSING_COMPETENCE: "mangler den krævede kompetence",
};

const getStaffingWarnings = (task) =>
  (task?.staffingWarnings ?? []).map((warning) => {
    const employee = task.assignedEmployees?.find(
      (e) => e.id === warning.employeeId,
    );
    const name = employee
      ? `${employee.firstName} ${employee.lastName}`
      : "En medarbejder";
    return `${name} ${WARNING_TEXTS[warning.warningType] ?? "har en bemandingsadvarsel"}`;
  });

export default getStaffingWarnings;
