const fieldConfig = {
  suggestion: {
    nameDA: { min: 2, max: 100 },
    descriptionDA: { min: 5, max: 200 },
  },
  dish: {
    nameDA: { min: 2, max: 100 },
    descriptionDA: { min: 5, max: 200 },
    nameEN: { min: 2, max: 100 },
    descriptionEN: { min: 5, max: 200 },
  },
  station: {
    name: { min: 2, max: 100 },
    description: { min: 5, max: 200 },
  },
  allergen: {
    nameDA: { min: 2, max: 100 },
    nameEN: { min: 2, max: 100 },
    descriptionDA: { min: 5, max: 200 },
    descriptionEN: { min: 5, max: 200 },
    displayNumber: { min: 1, max: 99 },
  },
  menu: {
    week: { min: 1, max: 52 },
    year: { min: 2026, max: 2040 },
  },
  ingredientRequest: {
    name: { min: 2, max: 100 },
    quantity: { type: "number", min: 0.1, max: 9999 },
  },
  shoppingListItem: {
    ingredientName: { min: 2, max: 100 },
    quantity: { type: "number", min: 0.1, max: 9999 },
  },
  takeawayOffer: {
    offeredPortions: { type: "number", min: 1, max: 999 },
    price: { type: "number", min: 0.1, max: 99999 },
  },
};

export default fieldConfig;
