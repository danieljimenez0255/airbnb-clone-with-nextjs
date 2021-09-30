const normalizeInput = (value) => {
  if (!value) return value;
  const currentValue = value.replace(/[^\d]/g, "");
  const cvLength = currentValue.length;

  if (cvLength < 4) return currentValue;
  if (cvLength < 7)
    return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
  return `(${currentValue.slice(0, 3)}) ${currentValue.slice(
    3,
    6
  )}-${currentValue.slice(6)}`;
};

export const phoneFormatFunc = (value, location) => {
  const regexTest = value.phone.replace(/\D/g, "");
  if (location === "United States (+1)") {
    return {
      phone: normalizeInput(value.phone),
      email: value.email,
    };
  } else if (location !== "United States (+1)") {
    return {
      phone: regexTest,
      email: value.email,
    };
  }
};

export const reconstructNum = (selected, phoneNumberAndEmail) => {
  let numOutput = null;
  const phoneNum =
    selected.substring(selected.indexOf("(")) + phoneNumberAndEmail.phone;
  const location = selected.substring(0, selected.indexOf("(") - 1);
  if (location === "United States") {
    const areaCodeBracketOne = phoneNum.indexOf("(", 1);
    const areaCodeBracketTwo = phoneNum.indexOf(")", areaCodeBracketOne);
    const phoneDash = phoneNum.indexOf("-");
    const internationalCode = phoneNum.substring(
      phoneNum.indexOf("(") + 2,
      phoneNum.indexOf(")")
    );

    const areaCode = phoneNum.substring(
      areaCodeBracketOne + 1,
      areaCodeBracketTwo
    );

    const mainNumOne = phoneNum.substring(areaCodeBracketTwo + 2, phoneDash);
    const mainNumTwo = phoneNum.substring(phoneDash + 1);
    numOutput = internationalCode + areaCode + mainNumOne + mainNumTwo;
  } else {
    const mainCode = phoneNum.substring(
      phoneNum.indexOf("(") + 2,
      phoneNum.indexOf(")")
    );
    const mainNum = phoneNum.substring(phoneNum.indexOf(")") + 1);
    numOutput = mainCode + mainNum;
  }
  return numOutput;
};
