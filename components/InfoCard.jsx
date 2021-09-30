import Image from "next/image";
import { HeartIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";
import { useSetRecoilState } from "recoil";
import { getPriceCard, isShowM } from "@/lib/atoms";

const InfoCard = ({
  img,
  location,
  title,
  description,
  star,
  price,
  total,
}) => {
  //state for modal display
  const setIsShow = useSetRecoilState(isShowM);
  const setPrice = useSetRecoilState(getPriceCard);

  const changeShow = (itemPrice) => {
    setIsShow(true);
    setPrice(itemPrice);
  };

  return (
    <>
      <div className="flex py-7 px-2 border-b cursor-pointer hover:border-t hover:border-t-black hover:shadow-lg pr-4 transition duration-200 ease-out first:border-t">
        <div className="relative h-24 w-40 md:h-40 md:w-60 flex-shrink-0 2">
          <Image
            src={img}
            layout="fill"
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>
        <div className="flex flex-col flex-grow pl-5">
          <div className="flex justify-between">
            <p>{location}</p>
            <HeartIcon className="h-7 cursor-pointer" />
          </div>
          <h4 className="text-xl">{title}</h4>
          <div className="border-b w-10 pt-2" />
          <p className="pt-2 text-sm text-gray-500 flex-grow">{description}</p>
          <div className="flex justify-between items-end pt-5">
            <p className="flex items-center">
              <StarIcon className="h-5 text-red-400" />
              {star}
            </p>
            <div className="flex flex-col items-end">
              <button
                type="button"
                className="bg-airbnb-red py-2 px-4 rounded-lg mb-2 text-white font-semibold hover:bg-[orange] transition-colors duration-300 cursor-pointer"
                onClick={() => changeShow(total)}
              >
                Make Reservation
              </button>
              <p className="text-lg font-semibold pb-2 lg:text-2xl text-right">
                {price} / Night
              </p>
              {total && (
                <p className="text-right font-extralight border-b">
                  ${total} total
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoCard;
