export const search = (baseString, filter) => {
  return baseString.toString().replace(/ /g, "").toLowerCase().includes(filter.replace(/ /g, "").toLowerCase());
};
