export const replaceStr = (
  originalStr: string,
  matchString: any,
  replacebleString: any
) => {
  if (
    originalStr &&
    typeof matchString !== "undefined" &&
    typeof replacebleString !== "undefined"
  ) {
    return originalStr.replace(matchString, replacebleString);
  }
  return originalStr;
};

export const formatDate = (date: any) => {
  let months: Array<string> = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let newDate: Date = new Date(date),
    m = newDate.getMonth(),
    currentMonth = months[m];

  console.log(currentMonth + newDate.getDate(), newDate.getFullYear());
  return currentMonth + " " + `${newDate.getDate()}, ${newDate.getFullYear()}`;
};
