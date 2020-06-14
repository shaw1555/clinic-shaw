export const search = (baseString, filter) => {  
  return baseString === null ? true : baseString.toString().replace(/ /g, "").toLowerCase().includes(filter.replace(/ /g, "").toLowerCase());
};
