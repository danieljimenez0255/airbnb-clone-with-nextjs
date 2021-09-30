export const guestsReducer = (state, action) => {
  switch (action.type) {
    case "adultsInc":
      return {
        adults: state.adults + 1,
        children: state.children,
        infants: state.infants,
      };
    case "childrenInc":
      return {
        adults: state.adults,
        children: state.children + 1,
        infants: state.infants,
      };
    case "infantsInc":
      return {
        adults: state.adults,
        children: state.children,
        infants: state.infants + 1,
      };
    case "adultsDesc":
      return {
        adults: state.adults - 1,
        children: state.children,
        infants: state.infants,
      };
    case "childrenDesc":
      return {
        adults: state.adults,
        children: state.children - 1,
        infants: state.infants,
      };
    case "infantsDesc":
      return {
        adults: state.adults,
        children: state.children,
        infants: state.infants - 1,
      };
    default:
      throw new Error();
  }
};
