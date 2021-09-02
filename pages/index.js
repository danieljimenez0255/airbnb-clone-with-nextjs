import Head from "next/head";

import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LargeCard from "../components/LargeCard";
import MediumCard from "../components/MediumCard";
import SmallCard from "../components/SmallCard";

export default function Home({ exploreData, cardsData }) {
  return (
    <div className="">
      <Head>
        <title>Airbnb-Nextjs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Banner />
      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData?.map((location, i) => (
              <SmallCard
                key={i}
                location={location.location}
                image={location.img}
                distance={location.distance}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
          <div className="flex space-x-3 overflow-y-hidden overflow-x-scroll scrollbar-hide p-3 -ml-3">
            {cardsData?.map((card, i) => (
              <MediumCard key={i} image={card.img} title={card.title} />
            ))}
          </div>
        </section>

        <LargeCard
          img="https://links.papareact.com/4cj"
          title="The Greatest Outdoors"
          description="Wishlists curated by Airbnb."
          buttonText="Get Inspired"
        />
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  // small cards data
  const exploreData = await fetch("https://links.papareact.com/pyp").catch(
    (err) => console.error(err)
  );
  const exploreDataJS = await exploreData.json();

  // medium cards data
  const cardsData = await fetch("https://links.papareact.com/zp1").catch(
    (err) => console.error(err)
  );
  const cardsDataJS = await cardsData.json();

  return {
    props: {
      exploreData: exploreDataJS,
      cardsData: cardsDataJS,
    },
  };
}
