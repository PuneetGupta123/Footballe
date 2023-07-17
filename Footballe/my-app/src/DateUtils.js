export const isDateInLocalStorageTodayDate = () => {
  var dateInLocalStorage = localStorage.getItem("lastPlayedDate");
  var today = new Date();
  if (!dateInLocalStorage) return false;
  var dateJSON = JSON.parse(dateInLocalStorage);
  if (
    dateJSON["y"] === today.getFullYear() &&
    dateJSON["m"] === today.getMonth() + 1 &&
    dateJSON["d"] === today.getDate()
  )
    return true;
  return false;
};

export const isDateInLocalStorageYesterdayDate = () => {
  var dateInLocalStorage = localStorage.getItem("lastPlayedDate");
  var today = new Date();
  if (!dateInLocalStorage) return false;
  var dateJSON = JSON.parse(dateInLocalStorage);
  if (
    dateJSON["y"] === today.getFullYear() &&
    dateJSON["m"] === today.getMonth() + 1 &&
    dateJSON["d"] === today.getDate() - 1
  )
    return true;
  return false;
};

export const addTodayDateToLocalStorage = () => {
  var today = new Date();
  var dateJSON = {
    y: today.getFullYear(),
    m: today.getMonth() + 1,
    d: today.getDate(),
  };
  localStorage.setItem("lastPlayedDate", JSON.stringify(dateJSON));
};

export const removeDateFromLocalStorage = () => {
  localStorage.removeItem("lastPlayedDate");
};
