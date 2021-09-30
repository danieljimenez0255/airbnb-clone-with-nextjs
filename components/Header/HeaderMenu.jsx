import { MenuIcon, UserCircleIcon } from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { updatedHeaderM, verifyInfo } from "@/lib/atoms";
import { verifyInfoDecrypt } from "@/lib/selectors";

export default function HeaderMenu() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const getVal = useRecoilValue(verifyInfoDecrypt);
  const setLoginInfo = useSetRecoilState(verifyInfo);
  const updateHeader = useRecoilValue(updatedHeaderM);

  useEffect(() => {
    router.prefetch("/auth/signin");
  }, []);

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            className={`${
              !updateHeader && "bg-white text-gray-500"
            } flex border-2 space-x-2 rounded-full p-2 items-center cursor-pointer`}
          >
            <MenuIcon className="h-6" />
            {!session?.user?.image && !getVal[0]?.loginInfo ? (
              <UserCircleIcon className="h-6" />
            ) : session?.user?.image && !getVal[0]?.loginInfo ? (
              <Image
                className="rounded-full"
                src={session?.user?.image}
                width={24}
                height={24}
                alt="Login Logo"
              />
            ) : getVal[0]?.loginInfo && !session?.user?.image ? (
              <Image
                className="rounded-full"
                src={"/images/placeholder-image.jpg"}
                width={24}
                height={24}
                alt="Login Logo"
              />
            ) : (
              <UserCircleIcon className="h-6" />
            )}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {!session && !getVal[1]?.mainInfo?._id ? (
                <>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => router.push("/auth/signin")}
                        className={`${
                          active ? " text-red-400" : "text-gray-900 font-bold"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        style={{ backgroundColor: active && "#DBEAFE" }}
                      >
                        Sign Up
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => router.push("/auth/signin")}
                        className={`${
                          active ? "text-red-400" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 font-bold text-sm`}
                        style={{ backgroundColor: active && "#DBEAFE" }}
                      >
                        Login
                      </button>
                    )}
                  </Menu.Item>
                </>
              ) : (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => {
                        if (session) {
                          signOut({
                            callbackUrl: "/",
                          });
                        } else {
                          setLoginInfo({ loginInfo: [] });
                          router.reload();
                        }
                      }}
                      className={`${
                        active ? "text-red-400" : "text-gray-900"
                      } group flex rounded-md items-center w-full px-2 font-bold py-2 text-sm`}
                      style={{ backgroundColor: active && "#DBEAFE" }}
                    >
                      Sign Out
                    </button>
                  )}
                </Menu.Item>
              )}
            </div>
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "text-red-400" : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    style={{ backgroundColor: active && "#DBEAFE" }}
                  >
                    Host Your Home
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "text-red-400" : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    style={{ backgroundColor: active && "#DBEAFE" }}
                  >
                    Host an Experience
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "text-red-400 " : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    style={{ backgroundColor: active && "#DBEAFE" }}
                  >
                    Help
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
