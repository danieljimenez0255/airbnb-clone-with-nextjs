import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { aBorder, sCheck, selectedM, listInfoM } from "@/lib/atoms";

const PhoneNumberListbox = () => {
  const [selected, setSelected] = useRecoilState(selectedM);
  const [activeBorder, setActiveBorder] = useRecoilState(aBorder);
  const scrollCheck = useRecoilValue(sCheck);
  const listInfo = useRecoilState(listInfoM);

  return (
    <Listbox
      value={selected}
      onChange={(val) => {
        setSelected(val);
      }}
    >
      <div>
        <div>
          <Listbox.Button
            className={`relative border ${
              activeBorder === 1 && " border-black border-2 "
            } w-full py-1 pl-3 pr-10 text-left bg-white rounded-t-lg shadow-md cursor-pointer `}
          >
            <div
              onClick={() => {
                setActiveBorder(1);
              }}
            >
              <span className="text-xs leading-5 text-auth-gray">
                Country/Region
              </span>
              <span className="block truncate">{selected}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </div>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className={`absolute ${
                scrollCheck && "bottom-full"
              } w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}
            >
              {listInfo[0].map(({ location, code }, i) => (
                <Listbox.Option
                  key={i}
                  className={({ active, selected }) =>
                    `${active ? " bg-airbnb-red" : "text-gray-900"}
                         ${selected && " bg-airbnb-red"}
                            cursor-pointer select-none relative py-2 pl-10 pr-4`
                  }
                  value={location + " " + code}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? "font-medium" : "font-normal"
                        } block truncate`}
                      >
                        {location}
                        {code}
                      </span>
                      {selected ? (
                        <span
                          className={`${
                            active ? "text-amber-600" : "text-amber-600"
                          }
                                  absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </div>
    </Listbox>
  );
};

export default PhoneNumberListbox;
