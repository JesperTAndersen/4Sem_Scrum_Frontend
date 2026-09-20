const fieldConfig = {
  project: {
    title: { min: 2, max: 100 },
    description: { min: 5, max: 200 },
  },
  competence: {
    name: { min: 2, max: 100 },
    rate: { min: 0, max: 10000 },
  },
  stage: {
    name: { min: 2, max: 100 },
  },
  task: {
    name: { min: 2, max: 100 },
    estimate: { min: 0.5, max: 10000 },
    competenceIds: { minItems: 1 },
  },
  competence: {
    name: { min: 2, max: 100 },
    rate: { min: 0, max: 100000 }, 
  },
  user: {
    firstName: { min: 2, max: 50 },
    lastName: { min: 2, max: 50 },
    email: { min: 5, max: 100 },
    password: { min: 6, max: 100 },
    currentPassword: { min: 6, max: 100 },
    newPassword: { min: 6, max: 100 },
  },
};

export default fieldConfig;
