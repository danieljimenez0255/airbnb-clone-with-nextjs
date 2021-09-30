import Image from "next/image";
import { useEffect, useState } from "react";

const MediumCard = ({ image, title }) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    switch (title) {
      case "Outdoor getaways":
        setUrl(
          "https://www.airbnb.com/s/homes?refinement_paths%5B%5D=%2Fhomes%2Fsection%2FNEARBY_LISTINGS%3A483&room_types%5B%5D=Entire%20home%2Fapt&property_type_id%5B%5D=57&property_type_id%5B%5D=4&property_type_id%5B%5D=32&property_type_id%5B%5D=58&property_type_id%5B%5D=18&property_type_id%5B%5D=22&property_type_id%5B%5D=17&property_type_id%5B%5D=23&property_type_id%5B%5D=63&property_type_id%5B%5D=24&property_type_id%5B%5D=12&property_type_id%5B%5D=19&property_type_id%5B%5D=44&property_type_id%5B%5D=66&property_type_id%5B%5D=34&property_type_id%5B%5D=16&property_type_id%5B%5D=6&property_type_id%5B%5D=69&property_type_id%5B%5D=15&title_type=CURATED_PROPERTY_TYPE"
        );
        break;
      case "Unique stays":
        setUrl(
          "https://www.airbnb.com/s/homes?refinement_paths%5B%5D=%2Fhomes%2Fsection%2FNEARBY_LISTINGS%3A2400&room_types%5B%5D=Entire%20home%2Fapt&property_type_id%5B%5D=5&property_type_id%5B%5D=6&property_type_id%5B%5D=8&property_type_id%5B%5D=10&property_type_id%5B%5D=12&property_type_id%5B%5D=15&property_type_id%5B%5D=16&property_type_id%5B%5D=17&property_type_id%5B%5D=18&property_type_id%5B%5D=19&property_type_id%5B%5D=23&property_type_id%5B%5D=24&property_type_id%5B%5D=25&property_type_id%5B%5D=28&property_type_id%5B%5D=32&property_type_id%5B%5D=34&property_type_id%5B%5D=44&property_type_id%5B%5D=50&property_type_id%5B%5D=54&property_type_id%5B%5D=57&property_type_id%5B%5D=58&property_type_id%5B%5D=61&property_type_id%5B%5D=63&property_type_id%5B%5D=64&property_type_id%5B%5D=66&property_type_id%5B%5D=67&property_type_id%5B%5D=68&property_type_id%5B%5D=69&property_type_id%5B%5D=62&property_type_id%5B%5D=51&title_type=CURATED_PROPERTY_TYPE"
        );
        break;
      case "Entire homes":
        setUrl(
          "https://www.airbnb.com/s/homes?ne_lat=56.04267453041206&ne_lng=-91.92544502322897&sw_lat=12.924125469587953&sw_lng=-144.23535497677102&room_types%5B%5D=Entire%20home%2Fapt&property_type_id%5B%5D=2&search_type=NAVIGATION_CARD&title_type=CURATED_PROPERTY_TYPE"
        );
        break;
      case "Pets allowed":
        setUrl(
          "https://www.airbnb.com/s/homes?ne_lat=56.04267453041206&ne_lng=-91.92544502322897&sw_lat=12.924125469587953&sw_lng=-144.23535497677102&room_types%5B%5D=Entire%20home%2Fapt&search_type=filter_change&title_type=CURATED_PROPERTY_TYPE&tab_id=home_tab&refinement_paths%5B%5D=%2Fhomes&flexible_trip_dates%5B%5D=november&flexible_trip_dates%5B%5D=october&flexible_trip_lengths%5B%5D=weekend_trip&date_picker_type=calendar&amenities%5B%5D=12"
        );
        break;
      default:
        break;
    }
  });

  return (
    <a href={url} target="_blank">
      <div className="cursor-pointer hover:scale-105 transform transition duration-300 ease-out">
        <div className="relative h-[20.95rem] w-[20.95rem]">
          <Image className="rounded-xl" src={image} layout="fill" />
        </div>
        <h3 className="text-2xl mt-3">{title}</h3>
      </div>
    </a>
  );
};

export default MediumCard;
