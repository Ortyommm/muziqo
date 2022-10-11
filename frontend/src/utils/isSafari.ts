import UAParser from "ua-parser-js";

export const isSafari = () => {
  return new UAParser().getBrowser().name?.toLowerCase().includes("safari");
};
