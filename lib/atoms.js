// will contain the atoms
import { format, addMonths } from "date-fns";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

// nav bar atoms

export const updatedHeaderM = atom({
  key: "headerM",
  default: false,
});

export const headerDisplayM = atom({
  key: "headerDisplay",
  default: 0,
});

export const activeLinkM = atom({
  key: "headerActiveLink",
  default: 1,
});

// atoms for email/phone input fields

export const emailAndPhone = atom({
  key: "eAp",
  default: "phone",
});

export const pAndE = atom({
  key: "phoneAndEmail",
  default: {
    phone: "",
    email: "",
  },
});

// these are regarding the phone int code

export const listInfoM = atom({
  key: "listOptions",
  default: [],
});

export const selectedM = atom({
  key: "selected",
  default: `United States (+1)`,
});

// these handle how the input fields are focused on

export const aBorder = atom({
  key: "activeBorder",
  default: 0,
});

export const pInput = atom({
  key: "phoneInput",
  default: false,
});

export const sCheck = atom({
  key: "scrollCheck",
  default: null,
});

// handle the inputted code check

export const pVerification = atom({
  key: "phoneVerification",
  default: {
    display: false,
    validNumberMessage: "",
  },
});

export const emailVerification = atom({
  key: "emailVerfication",
  default: {
    validMessage: "0",
  },
});

// contains successful login via phone

export const verifyInfo = atom({
  key: "verifyInfo",
  default: {
    loginInfo: [],
  },
  effects_UNSTABLE: [persistAtom],
});

// searchbar info

export const allLocations = atom({
  key: "everyLocation",
  default: [],
});

export const locationAtom = atom({
  key: "locationInput",
  default: ["", ""],
});

export const checkInDate = atom({
  key: "startDate",
  default: null,
});

export const checkOutDate = atom({
  key: "endDate",
  default: null,
});

export const guestsTotalAtom = atom({
  key: "guestsAtom",
  default: {
    adults: 0,
    children: 0,
    infants: 0,
  },
});

export const flexibleSelect = atom({
  key: "flexSelect",
  default: {
    type: "calendar",
    info: {
      stayType: "Weekend",
      selectedMonths: [{ i: 0, m: format(addMonths(new Date(), 1), "LLLL") }],
    },
  },
});

export const searchHoverState = atom({
  key: "hoverS",
  default: 0,
});

export const searchClickState = atom({
  key: "clickS",
  default: 0,
});

// tab selection state
export const tabM = atom({
  key: "tabSelection",
  default: "Places to Stay",
});

// mobile schedule
export const displayM = atom({
  key: "mobileS",
  default: 5,
});

// sign in load screen state
export const loadScreenS = atom({
  key: "loadSignIn",
  default: false,
});

// card payment info
export const isShowM = atom({
  key: "showModalCard",
  default: false,
});

export const getPriceCard = atom({
  key: "getPriceCard",
  default: 0,
});
