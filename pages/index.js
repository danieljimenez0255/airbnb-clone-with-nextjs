import Head from "next/head";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Banner from "@/components/Banner/Banner";
import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import LargeCard from "@/components/LargeCard";
import MediumCard from "@/components/MediumCard";
import SmallCard from "@/components/SmallCard";
import Upcoming from "@/components/Upcoming";
import {
  activeLinkM,
  allLocations,
  displayM,
  headerDisplayM,
  loadScreenS,
} from "@/lib/atoms";
import { getLocations } from "@/lib/locationsInfo";
import MobileViewSearch from "@/components/Mobile/MobileViewSearch";
import MobileFooter from "@/components/Mobile/MobileFooter";
import { verifyInfoDecrypt } from "@/lib/selectors";
import SiteUpdate from "@/components/SiteUpdate";
import { useSession } from "next-auth/react";

export default function Home({ exploreData, cardsData, locations }) {
  const [headerDisplay, setHeaderDisplay] = useRecoilState(headerDisplayM);
  const [mobileS, setMobileS] = useRecoilState(displayM);
  const setAllLocations = useSetRecoilState(allLocations);
  const getVal = useRecoilValue(verifyInfoDecrypt);
  const [loadScreen, setLoadScreen] = useRecoilState(loadScreenS);
  const [activeLink, setActiveLink] = useRecoilState(activeLinkM);
  const { data: session, status } = useSession();

  // when user signs in, displays message informing them and then shows
  // home page after setting loadScreen to false
  useEffect(() => {
    if (loadScreen) {
      setLoadScreen(false);
    }
  }, [loadScreen]);

  // detects when screen width changed and it changes menu via screen change
  const displayChange = () => {
    setHeaderDisplay(window.innerWidth);
  };
  useEffect(() => {
    displayChange();
    window.addEventListener("resize", displayChange);

    setAllLocations(locations);

    return () => {
      window.removeEventListener("resize", displayChange);
    };
  }, []);

  // when there is a change in menu, reset state
  useEffect(() => {
    if (headerDisplay > 950) {
      setMobileS(5);
      setActiveLink(1);
    } else if (headerDisplay < 950 && activeLink !== 1) {
      setActiveLink(1);
    }
  }, [headerDisplay, mobileS]);

  // removes scroll when certain things are displayed temporarily
  useEffect(() => {
    if (mobileS < 5 || (activeLink >= 2 && headerDisplay < 950)) {
      document?.querySelector("body")?.classList?.add("overflow-removed");
    } else {
      document?.querySelector("body")?.classList?.remove("overflow-removed");
    }
    return () =>
      document?.querySelector("body")?.classList?.remove("overflow-removed");
  }, [mobileS, activeLink, headerDisplay]);

  return (
    <div className="relative">
      <Head>
        <title>Airbnb-Nextjs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/*The Upcoming & SiteUpdate comps are temp until the specific sections are built */}
      {/* This modal will display on users very first login letting them know about upcoming account settings page  */}
      {getVal[0]?.loginInfo[0]?.infoSeen === false && (
        <div className="absolute h-full w-full bg-black opacity-70 z-[60] overflow-hidden">
          <Upcoming />
        </div>
      )}

      {activeLink === 2 && headerDisplay < 950 && (
        <div className="fixed z-[65]  h-screen w-full  bg-gradient-to-r from-[#70019c] to-[#c6017e]">
          <SiteUpdate type="Wishlist" />
        </div>
      )}
      {/* these display when logged in so added extra logic  */}
      {activeLink === 4 && headerDisplay < 950 && (
        <div className="fixed z-[65]  h-screen w-full  bg-gradient-to-r from-[#70019c] to-[#c6017e]">
          <SiteUpdate type="Trips" />
        </div>
      )}
      {activeLink === 5 && headerDisplay < 950 && (
        <div className="fixed z-[65]  h-screen w-full  bg-gradient-to-r from-[#70019c] to-[#c6017e]">
          <SiteUpdate type="Inbox" />
        </div>
      )}

      {/* header/footer configurations based on screen size  */}
      {headerDisplay > 950 ? (
        <div className="absolute h-full w-full">
          <Header searchDisplay={false} />
        </div>
      ) : headerDisplay <= 950 ? (
        <>
          <div className="absolute flex flex-col justify-between h-full w-full">
            <MobileViewSearch locations={locations} />
            {mobileS === 5 && <MobileFooter />}
          </div>
        </>
      ) : null}

      {/* rest of page  */}

      <div className="bg-home-bg bg-no-repeat bg-center bg-scroll bg-cover">
        <Banner locations={locations} />
      </div>
      <main className="px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-[2.1rem] font-bold pb-4">Explore Nearby</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData?.map(({ location, img, distance }, i) => (
              <SmallCard
                key={i}
                location={location}
                country={
                  locations?.filter(
                    ({ city, country }) =>
                      city.toLowerCase() === location?.toLowerCase() &&
                      country === "United Kingdom"
                  )[0]?.country
                }
                image={img}
                distance={distance}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[2.1rem] font-bold pt-8 pb-4">Live Anywhere</h2>
          <div className="flex space-x-4 overflow-x-scroll scrollbar-hide w-full">
            {cardsData?.map((card, i) => (
              <MediumCard key={i} image={card.img} title={card.title} />
            ))}
          </div>
        </section>

        <LargeCard
          img="/images/airbnb-clone-largeCard.webp"
          title="Try hosting"
          description={
            <>
              Earn extra income and unlock new
              <br />
              opportunities by sharing your space.
            </>
          }
          buttonText="Learn more"
        />
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  // small cards data
  const exploreData = await fetch("https://links.papareact.com/pyp")
    .then((res) => res.json())
    .catch((err) => console.error(err));

  // medium cards data
  const cardsData = await fetch("https://links.papareact.com/zp1")
    .then((res) => res.json())
    .catch((err) => console.error(err));

  const locations = await getLocations();
  return {
    props: {
      exploreData: exploreData,
      cardsData: cardsData,
      locations: locations,
    },
  };
}
