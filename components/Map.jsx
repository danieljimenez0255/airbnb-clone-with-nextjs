import { getCenter } from "geolib";
import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";

const Map = ({ coordinates: results }) => {
  const [selectedLocation, setSelectedLocation] = useState({});
  const resultsCoordinates = results.map(
    ({ coordinate: { lat: latitude, lon: longitude } }) => {
      return {
        latitude,
        longitude,
      };
    }
  );
  const center = getCenter(resultsCoordinates);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 9,
  });

  useEffect(() => {
    const updatedCoordinates = results.map(
      ({ coordinate: { lat: latitude, lon: longitude } }) => {
        return {
          latitude,
          longitude,
        };
      }
    );

    const updatedCenter = getCenter(updatedCoordinates);
    setViewport({
      width: "100%",
      height: "100%",
      latitude: updatedCenter.latitude,
      longitude: updatedCenter.longitude,
      zoom: 9,
    });
  }, [results]);

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/djimenezdev-0255/ckt7230kd1k7917s26ovbqh89"
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      {...viewport}
      onViewportChange={(nextViewport) => {
        setViewport(nextViewport);
      }}
    >
      {results?.map(
        ({
          coordinate: { lat: latitude, lon: longitude },
          name,
          optimizedThumbUrls: { srpDesktop },
          starRating,
          ratePlan: {
            price: { exactCurrent },
          },
        }) => (
          <div key={longitude}>
            <Marker
              longitude={longitude}
              latitude={latitude}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <p
                role="img"
                className="cursor-pointer text-2xl animate-bounce"
                aria-label="push-pin"
                onClick={() => setSelectedLocation({ latitude, longitude })}
              >
                🏨
              </p>
            </Marker>
            {selectedLocation?.longitude === longitude ? (
              <Popup
                closeOnClick={true}
                longitude={longitude}
                latitude={latitude}
                onClose={() => setSelectedLocation({})}
                className="relative z-20 max-w-[250px] rounded-lg shadow-xl"
              >
                <div>
                  <div className="relative object-contain  w-full max-w-[250px] h-36">
                    <Image
                      className="rounded-tr-lg rounded-tl-lg"
                      src={srpDesktop}
                      layout="fill"
                      alt={`${name}`}
                    />
                  </div>
                  <h5 className="flex items-center ml-2 mt-2">
                    <StarIcon className="h-5 text-red-400" />
                    {starRating}
                  </h5>
                  <h4 className="mx-3">{name}</h4>
                  <p className="text-lg font-semibold pb-2 lg:text-2xl text-right mr-3">
                    {exactCurrent} / Night
                  </p>
                </div>
              </Popup>
            ) : (
              false
            )}
          </div>
        )
      )}
    </ReactMapGL>
  );
};

export default Map;
