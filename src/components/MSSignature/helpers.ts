export const filterWithNumberOnly = (str: string) => {
  return [...str].filter((pn) => pn !== " " && !isNaN(+pn)).join("");
};

export const formatePhoneNumber = (phone: string) => {
  const phoneInNumbers = filterWithNumberOnly(phone);
  if (phoneInNumbers.length === 10) {
    return `(${phoneInNumbers.substring(0, 3)}) ${phoneInNumbers.substring(
      3,
      6
    )}-${phoneInNumbers.substring(6, 10)}`;
  }
  return phoneInNumbers;
};
