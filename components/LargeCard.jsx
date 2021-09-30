import Image from "next/image";

const LargeCard = ({ img, title, description, buttonText }) => {
  return (
    <section className="relative py-16 pl-3 cursor-pointer">
      <div className="relative h-[30rem] min-w-[300px]">
        <Image
          className="rounded-2xl"
          src={img}
          objectFit="cover"
          layout="fill"
        />
      </div>
      <div className="absolute top-52 left-12  text-white">
        <h3 className="text-4xl mb-3 w-64 font-bold">{title}</h3>
        <p className="text-lg">{description}</p>
        <a href="https://www.airbnb.com/host/homes?locale=en" target="_blank">
          <button
            type="button"
            className="text-base bg-white text-gray-900 px-8 py-4 rounded-lg mt-5"
          >
            {buttonText}
          </button>
        </a>
      </div>
    </section>
  );
};

export default LargeCard;
