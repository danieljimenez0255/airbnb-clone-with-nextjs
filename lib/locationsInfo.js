export const getLocations = async () => {
  const cities = [];
  const locationsFetch = await fetch(
    "https://countriesnow.space/api/v0.1/countries"
  )
    .then((res) => res.json())
    .catch((err) => console.error(err.message));
  locationsFetch?.data?.forEach((details) => {
    details?.cities?.forEach((city) => {
      cities.push({ city: city, country: details.country });
    });
  });
  return cities;
};

export const guestsDisplay = (guestsCount) => {
  return guestsCount?.adults > 0 &&
    !guestsCount?.children > 0 &&
    !guestsCount?.infants > 0
    ? guestsCount?.adults + " guests"
    : guestsCount?.adults > 0 &&
      guestsCount?.children > 0 &&
      !guestsCount?.infants > 0
    ? guestsCount?.adults + guestsCount?.children + " guests"
    : guestsCount?.adults > 0 &&
      guestsCount?.infants > 0 &&
      !guestsCount?.children > 0
    ? guestsCount?.adults + guestsCount?.infants + " guests"
    : guestsCount?.adults > 0 &&
      guestsCount?.children > 0 &&
      guestsCount?.infants > 0
    ? guestsCount?.adults +
      guestsCount?.children +
      guestsCount?.infants +
      " guests"
    : "Add Guests";
};
