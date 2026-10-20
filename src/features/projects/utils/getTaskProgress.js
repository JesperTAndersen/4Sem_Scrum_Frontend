const getTaskProgress = (status) => {
  switch (status) {
    case "DONE":
      return 100;

    case "IN_PROGRESS":
      return 50;

    case "NOT_STARTED":
      return 0;

    default:
      return 0;
  }
};

export default getTaskProgress;
