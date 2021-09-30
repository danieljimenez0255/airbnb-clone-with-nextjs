import Image from "next/image";

const SmallCard = ({ location, country, image, distance }) => {
  return (
    <a
      href={`https://www.airbnb.com/s/${location}--${country.replace(
        /\s+/g,
        "-"
      )}/homes`}
      target="_blank"
    >
      <div className="flex items-center m-2 mt-5 space-x-4 rounded-xl cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out">
        <div className="relative h-16 w-16">
          <Image src={image} layout="fill" className="rounded-lg" />
        </div>
        <div>
          <h2>{location}</h2>
          <h3 className="text-gray-500">{distance}</h3>
        </div>
      </div>
    </a>
  );
};

export default SmallCard;
