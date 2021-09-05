import { getProviders, signIn } from "next-auth/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fab);

const signInPage = ({ providers }) => {
  return (
    <div>
      <h1>Test sign in Page</h1>
      <div className="space-x-3">
        {Object.values(providers).map(({ id, name: brandName }) => (
          <button
            key={id}
            type="button"
            onClick={() => signIn(id, { callbackUrl: "http://localhost:3000" })}
            className="cursor-pointer bg-red-400"
          >
            <FontAwesomeIcon
              icon={["fab", id]}
              className="bg-white text-blue-400 rounded-full"
            />
            <span>{brandName}</span>
          </button>
        ))}
      </div>
      {/* <button
        type="button"
        onClick={() =>
          signIn(providers?.google?.id, {
            callbackUrl: "http://localhost:3000",
          })
        }
        className="bg-red-500"
      >
        Click me to sign in with google{" "}
      </button> */}
    </div>
  );
};

export default signInPage;

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
