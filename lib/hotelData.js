import { format } from "date-fns";

export const fetchHotels = async ({ location, startDate, guests }) => {
  const locationResults = await fetch(
    `https://hotels-com-provider.p.rapidapi.com/v1/destinations/search?query=${location}&locale=en_US&currency=USD`,
    {
      method: "get",
      headers: {
        "x-rapidapi-host": process.env.RAPID_API_HOST,
        "x-rapidapi-key": process.env.RAPID_API_KEY,
      },
    }
  )
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => console.error(err.message));

  const CityGroup = locationResults.suggestions.filter(
    ({ group }) => group === "CITY_GROUP"
  );
  const destinationIDs = CityGroup[0].entities.map(({ destinationId }) => ({
    des: destinationId,
  }));
  const hotelDetails = await Promise.all(
    destinationIDs.map(async ({ des }, i) => {
      if (i < 1) {
        const destinationHotels = await fetch(
          `https://hotels-com-provider.p.rapidapi.com/v1/hotels/search?currency=USD&locale=en_US&adults_number=${guests}&sort_order=STAR_RATING_HIGHEST_FIRST&destination_id=${des}&checkout_date=${format(
            new Date(startDate),
            "yyyy-MM-dd"
          )}&checkin_date=${format(new Date(startDate), "yyyy-MM-dd")}`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": process.env.RAPID_API_HOST,
              "x-rapidapi-key": process.env.RAPID_API_KEY,
            },
          }
        )
          .then((res) => res.json())
          .then((res) => res)
          .catch((err) => console.error(err.message));

        return {
          results: { result: "OK", data: destinationHotels },
        };
      } else {
        return { results: { result: false } };
      }
    })
  );

  const mainData = [];
  hotelDetails.forEach((resultsM) => {
    if (resultsM.results.result === "OK") {
      mainData.push(...resultsM.results.data.searchResults.results);
    }
  });

  return mainData;
};
