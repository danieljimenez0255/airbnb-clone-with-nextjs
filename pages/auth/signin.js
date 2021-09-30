import { useEffect } from "react";
import Header from "@/components/Header/Header";
import PhoneLogin from "@/components/Auth/PhoneLogin";
import { getProviders, useSession } from "next-auth/react";
import ProvidersLogin from "@/components/Auth/ProvidersLogin";
import { useRecoilState, useRecoilValue } from "recoil";
import { listInfoM, loadScreenS } from "@/lib/atoms";
import OrSplit from "@/components/util/OrSplit";
import { useRouter } from "next/router";
import { verifyInfoDecrypt } from "@/lib/selectors";
import LoginMessage from "@/components/Auth/LoginMessage";
import { areaCodesFunc } from "@/lib/locationsInfo";

const signup = ({ phoneInfo, providers }) => {
  const [listInfo, setListInfo] = useRecoilState(listInfoM);
  const router = useRouter();
  const [loadScreen, setLoadScreen] = useRecoilState(loadScreenS);
  const vInfo = useRecoilValue(verifyInfoDecrypt);
  const { data: session, status } = useSession();

  useEffect(() => {
    let stateCheck = true;
    if (stateCheck) {
      setListInfo(phoneInfo);
    }

    return () => {
      stateCheck = false;
    };
  }, []);

  useEffect(() => {
    router.prefetch("/");
  }, []);

  useEffect(() => {
    let timeout;
    if (session || vInfo[0]?.loginInfo.length > 0) {
      setLoadScreen(true);
      timeout = setTimeout(() => {
        router.push("/");
        clearTimeout(timeout);
      }, 4000);
    }

    return () => clearTimeout(timeout);
  }, [session, vInfo]);

  return (
    <div className="min-h-[100vh]">
      {loadScreen === false ? (
        <>
          <Header searchDisplay="sign-in" />
          <main className="flex min-h-[100vh] pb-10">
            <div className="border m-auto border-authGray rounded-xl mt-10 max-w-[568px] w-full">
              <header className="w-full min-h-[64px] inline-flex items-center border-b">
                <h2 className="m-auto font-bold">Log in or sign up</h2>
              </header>
              <div className="p-8">
                <section className="relative z-10">
                  <h3 className="mt-2 mb-6 text-22 text-airbnb22 font-semibold">
                    Welcome to Airbnb
                  </h3>
                  <div className="mt-0">
                    <PhoneLogin />
                  </div>
                </section>
                <OrSplit />
                <section className="w-full">
                  <ProvidersLogin providers={providers} />
                </section>
              </div>
            </div>
          </main>
        </>
      ) : (
        <LoginMessage success={loadScreen} />
      )}
    </div>
  );
};

export async function getStaticProps() {
  const phoneInfo = await areaCodesFunc()
    .then((res) => res.json())
    .catch((err) => console.error(err.message));

  const providers = await getProviders();
  return {
    props: {
      phoneInfo,
      providers,
    },
  };
}

export default signup;
