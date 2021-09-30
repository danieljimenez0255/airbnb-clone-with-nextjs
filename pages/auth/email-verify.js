import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "@/components/Header/Header";
import OrSplit from "@/components/util/OrSplit";

const emailVerify = () => {
  return (
    <div className="min-h-[100vh]">
      <Header searchDisplay={true} />
      <main className="flex min-h-[100vh]">
        <div className="border m-auto border-authGray rounded-xl mt-10 max-w-[568px] w-full p-8">
          <header className="w-full min-h-[64px] inline-flex items-center justify-center">
            <FontAwesomeIcon
              icon={["fab", "airbnb"]}
              size="8x"
              className="text-airbnb-red"
            />
          </header>
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-3xl text-airbnb-red">
              Email Verification has been sent!
            </h1>
            <p className="relative z-10  py-4 font-bold text-xl underline">
              Check your email to verify!
            </p>
            <OrSplit />
            <div className="pt-4 inline-flex flex-col space-y-2 w-full">
              <button
                type="button"
                className="inline-flex items-center cursor-pointer bg-transparent  w-full m-0 text-center no-underline leading-6 tracking-normal text-[#484848] py-3 font-extrabold rounded-lg border hover:border-2 border-solid  border-authGray shadow-md  px-3 min-w-[71px] hover:scale-90 transition-all duration-500"
              >
                <FontAwesomeIcon icon="user-plus" className="mr-2" />
                <span className="inline-block m-auto">Go to Sign Up Page</span>
              </button>
              <button
                type="button"
                className="inline-flex items-center cursor-pointer bg-transparent  w-full m-0 text-center no-underline leading-6 tracking-normal text-[#484848] py-3 font-extrabold rounded-lg border hover:border-2 border-solid  border-authGray shadow-md  px-3 min-w-[71px] hover:scale-90 transition-all duration-500"
              >
                <FontAwesomeIcon icon="sign-in-alt" />
                <span className="inline-block m-auto">Go to Sign In Page</span>
              </button>
              <button
                type="button"
                className="inline-flex items-center cursor-pointer bg-transparent  w-full m-0 text-center no-underline leading-6 tracking-normal text-[#484848] py-3 font-extrabold rounded-lg border hover:border-2 border-solid  border-authGray shadow-md  px-3 min-w-[71px] hover:scale-90 transition-all duration-500"
              >
                <FontAwesomeIcon icon="home" />
                <span className="inline-block m-auto">Go back Home Page</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default emailVerify;
