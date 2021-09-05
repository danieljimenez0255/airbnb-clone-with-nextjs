import { getCenter } from "geolib";
import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

const Map = ({ coordinates: results }) => {
  const [selectedLocation, setSelectedLocation] = useState({});

  const resultsCoordinates = results.map((location) => {
    return {
      latitude: location.lat,
      longitude: location.long,
    };
  });

  const center = getCenter(resultsCoordinates);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });
  return (
    <ReactMapGL
      mapStyle="mapbox://styles/djimenezdev-0255/ckt7230kd1k7917s26ovbqh89"
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      {...viewport}
      onViewportChange={(nextViewport) => {
        setViewport(nextViewport);
      }}
    >
      {results?.map((location) => (
        <div key={location.long}>
          <Marker
            longitude={location.long}
            latitude={location.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              role="img"
              className="cursor-pointer text-2xl animate-bounce"
              aria-label="push-pin"
              onClick={() => setSelectedLocation(location)}
            >
              🕹️
            </p>
          </Marker>
          {selectedLocation?.long === location?.long ? (
            <Popup
              closeOnClick={true}
              longitude={location.long}
              latitude={location.lat}
              onClose={() => setSelectedLocation({})}
            >
              {location.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
};

export default Map;
