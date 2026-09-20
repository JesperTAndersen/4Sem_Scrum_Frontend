const fieldConfig = {
  project: {
    title: { min: 2, max: 100 },
    description: { min: 5, max: 200 },
  },
  competence: {
    name: { min: 2, max: 100 },
    rate: { min: 0, max: 10000 },
  },
};

export default fieldConfig;
