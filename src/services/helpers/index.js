export const userInfo = () => {
  let userInfo = {};

  if (!Object.keys(userInfo).length) {
    userInfo = JSON.parse(localStorage.getItem("user_info") || "{}");
  }

  return userInfo;
};

export const languageCombination = (lang) => {
  switch (lang) {
    case "en":
      return "us_en";
    case "ru":
      return "ru_ru";
    case "uz":
      return "uz_uz";
    case "lat":
      return "uz_lat";

    default:
      return "uz_lat";
  }
};

export const checkAmount = (item, length = "10") => {
  switch (length) {
    case "10":
      return item > 9 ? "9+" : item;
    case "100":
      return item > 99 ? "99+" : item;

    default:
      return item;
  }
};

export const isLawyer = () => {
  return userInfo().user_type === "Lawyer";
};

export function msToTime(duration) {
  var minutes = Math.min((duration / (100 * 60)) % 60),
    hours = Math.min((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return hours + ":" + minutes;
}
