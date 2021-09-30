import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/dist/client/router";
import { format } from "date-fns";
import InfoCard from "@/components/InfoCard";
import Map from "@/components/Map";
import { fetchHotels } from "@/lib/hotelData";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  activeLinkM,
  displayM,
  getPriceCard,
  headerDisplayM,
  isShowM,
} from "@/lib/atoms";
import MobileFooter from "@/components/Mobile/MobileFooter";
import MobileViewSearch from "@/components/Mobile/MobileSearch";
import { getLocations } from "@/lib/locationsInfo";
import CardPayment from "@/components/CardPayment";
import { useSession } from "next-auth/react";
import { verifyInfoDecrypt } from "@/lib/selectors";
import SiteUpdate from "@/components/SiteUpdate";

const Search = ({ newResults, locations }) => {
  const [isShow, setIsShow] = useRecoilState(isShowM);
  const [headerDisplay, setHeaderDisplay] = useRecoilState(headerDisplayM);
  const [mobileS, setMobileS] = useRecoilState(displayM);
  const priceM = useRecoilValue(getPriceCard);
  const getVal = useRecoilValue(verifyInfoDecrypt);
  const { data: session, status } = useSession();
  const [activeLink, setActiveLink] = useRecoilState(activeLinkM);
  const router = useRouter();
  // grabs user search info
  const { location, startDate, endDate, guests } = router.query;

  // formats dates with date fns
  const formattedStartDate = startDate
    ? format(new Date(startDate), "dd MMMM yy")
    : null;
  const formattedEndDate = startDate
    ? format(new Date(endDate), "dd MMMM yy")
    : null;

  // contains range via formatted dates
  const range =
    formattedStartDate &&
    formattedEndDate &&
    `${formattedStartDate} - ${formattedEndDate}`;

  // days between dates
  const startDateTime = startDate ? new Date(startDate).getTime() : null;
  const endDateTime = endDate ? new Date(endDate).getTime() : null;
  const daysBetweenDates =
    startDateTime &&
    endDateTime &&
    (endDateTime - startDateTime) / (1000 * 3600 * 24);

  // detects when screen width changed and it changes menu via screen change
  const displayChange = () => {
    setHeaderDisplay(window.innerWidth);
  };

  useEffect(() => {
    displayChange();
    window.addEventListener("resize", displayChange);

    return () => {
      window.removeEventListener("resize", displayChange);
    };
  }, []);

  // activates if user is searching via mobile and expands screen to desktop view
  useEffect(() => {
    if (headerDisplay > 950) {
      setMobileS(5);
      setActiveLink(1);
    } else if (headerDisplay < 950 && activeLink !== 1) {
      setActiveLink(1);
    }
  }, [headerDisplay, mobileS]);

  // activates during mobile search to remove scroll
  useEffect(() => {
    if (
      mobileS < 5 ||
      (activeLink >= 2 && activeLink < 6 && headerDisplay < 950)
    ) {
      document?.querySelector("body")?.classList?.add("overflow-removed");
    } else {
      document?.querySelector("body")?.classList?.remove("overflow-removed");
    }
    return () =>
      document?.querySelector("body")?.classList?.remove("overflow-removed");
  }, [mobileS, activeLink, headerDisplay]);

  return (
    <>
      <div className="relative">
        {/* display card  */}
        {isShow && (
          <CardPayment isShow={isShow} setIsShow={setIsShow} price={priceM} />
        )}

        {activeLink === 2 && headerDisplay < 950 && (
          <div className="fixed z-[65]  h-screen w-full  bg-gradient-to-r from-[#70019c] to-[#c6017e]">
            <SiteUpdate type="Wishlist" />
          </div>
        )}
        {/* these display when logged in so added extra logic  */}
        {activeLink === 4 &&
          headerDisplay < 950 &&
          (session || getVal[0]?.loginInfo[0]?.info) && (
            <div className="fixed z-[65]  h-screen w-full  bg-gradient-to-r from-[#70019c] to-[#c6017e]">
              <SiteUpdate type="Trips" />
            </div>
          )}
        {activeLink === 5 &&
          headerDisplay < 950 &&
          (session || getVal[0]?.loginInfo[0]?.info) && (
            <div className="fixed z-[65]  h-screen w-full  bg-gradient-to-r from-[#70019c] to-[#c6017e]">
              <SiteUpdate type="Inbox" />
            </div>
          )}

        {/* header/footer configurations based on screen size  */}
        {headerDisplay > 950 ? (
          <Header
            placeholder={`${location} | ${
              range ? range + " " + "|" : null
            }  ${guests} guests`}
            searchDisplay="search-header"
          />
        ) : headerDisplay <= 950 ? (
          <>
            <div className="absolute flex flex-col justify-between h-full w-full">
              <MobileViewSearch locations={locations} />
              {mobileS === 5 && <MobileFooter />}
            </div>
          </>
        ) : null}

        <main className="relative flex justify-between ">
          <section
            className={`flex-grow px-6  pb-36 ${
              headerDisplay <= 950 ? "pt-20" : "pt-14"
            }`}
          >
            <p className="text-xs">
              300+ Stays - {range ? range + " " + "-" : null}{" "}
              {guests ? "for " + guests + " guests" : null}
            </p>
            <h1 className="text-3xl font-semibold mt-2 mb-6">
              Stays in {location}
            </h1>
            <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800  white-space-nowrap">
              <p className="button">Cancellation Flexibility</p>
              <p className="button">Type of Place</p>
              <p className="button">Price</p>
              <p className="button">Room and Beds</p>
              <p className="button">More Filters</p>
            </div>
            <div className="flex flex-col">
              {newResults?.map(
                (
                  {
                    name,
                    id,
                    optimizedThumbUrls,
                    address,
                    starRating,
                    ratePlan,
                  },
                  i
                ) => {
                  let totalM =
                    Math.round(ratePlan.price.exactCurrent) +
                    Math.round(ratePlan.price.exactCurrent) * 0.125;
                  return (
                    <InfoCard
                      key={id}
                      img={optimizedThumbUrls.srpDesktop}
                      location={address.locality}
                      title={name}
                      description="Click me to see details"
                      star={starRating}
                      price={ratePlan.price.current}
                      total={
                        daysBetweenDates
                          ? Math.round(Math.round(totalM) * daysBetweenDates)
                          : null
                      }
                    />
                  );
                }
              )}
            </div>
          </section>
          <div className="relative xl:min-w-[600px]">
            <section className="hidden xl:inline-flex fixed xl:min-w-[600px] h-screen">
              <Map coordinates={newResults} />
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Search;

export async function getServerSideProps(context) {
  const userInputResults = await fetchHotels(context?.query);
  const locations = await getLocations();

  return {
    props: {
      newResults: userInputResults,
      locations: locations,
    },
  };
}
