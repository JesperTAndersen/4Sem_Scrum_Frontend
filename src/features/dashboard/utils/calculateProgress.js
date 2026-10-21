const calculateProgress = (notStarted, done) => {
  if (!done) {
    return null;
  }

  return total / done;
};

export default calculateProgress;
