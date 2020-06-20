export const search = (baseString, filter) => {  
  return baseString === null ? false : baseString.toString().replace(/ /g, "").toLowerCase().includes(filter.replace(/ /g, "").toLowerCase());
};
