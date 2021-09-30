import "tailwindcss/tailwind.css";
import "../styles/global.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Router } from "next/dist/client/router";
import ProgressBar from "@badrap/bar-of-progress";
import { SessionProvider } from "next-auth/react";
import { library, config } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faEnvelope,
  faMobileAlt,
  faExclamationCircle,
  faSpinner,
  faSignInAlt,
  faUserPlus,
  faHome,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { RecoilRoot } from "recoil";
config.autoAddCss = false;
library.add(
  fab,
  faEnvelope,
  faMobileAlt,
  faExclamationCircle,
  faSpinner,
  faSignInAlt,
  faUserPlus,
  faHome,
  faInfoCircle
);
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const progress = new ProgressBar({
  size: 4,
  color: "#FE595E",
  className: "z-50",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_TEST_PK);

function MyApp({ Component, pageProps }) {
  return (
    <Elements stripe={stripePromise}>
      <SessionProvider session={pageProps.session}>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </SessionProvider>
    </Elements>
  );
}

export default MyApp;
