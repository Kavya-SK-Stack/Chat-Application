import moment from "moment";

const fileFormat = (url = "") => {
  const fileExt = url.split(".").pop();

  if (fileExt === "mp4" || fileExt === "webm" || fileExt === "ogg")
    return "video";

  if (fileExt === "mp3" || fileExt === "wav") return "audio";

  if (
    fileExt === "png" ||
    fileExt === "jpg" ||
    fileExt === "jpeg" ||
    fileExt === "gif"
  )
    return "image";

  return "file";
};
const transformImage = (url = "", width = 100) => {
  if (typeof url !== "string" || !url.startsWith("http")) {
    return url;
  }

  const newUrl = url.replace("upload/", `upload/dpr_auto/w_${width}/`);
  return newUrl;
};

const getLast7Days = () => {
  const currentDate = moment();
  const last7Days = [];

  for (let i = 0; i < 7; i++) {
   
      const dayDate = currentDate.clone().subtract(i, "days");

      const dayName = dayDate.format("ddd");

      last7Days.unshift(dayName);
  }

  return last7Days;
};

const getOrSaveFromStorage = ({ key, value, get }) => {
  if (get) {
    const storedValue = localStorage.getItem(key);
    return storedValue === "undefined" ? null : JSON.parse(storedValue);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
export { fileFormat, getLast7Days, transformImage, getOrSaveFromStorage };
