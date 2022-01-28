export const capitalize = (text) => {
  if (typeof text !== "string") return "";
  return `${text.charAt(0).toUpperCase()}${text.slice(1).toLowerCase()}`;
};

export const delay = (ms) =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve(console.log(`delaying for ${ms / 1000} seconds`)),
      ms,
    ),
  );

export const getFormattedDate = (date) => {
  const formattedDate = new Date(date).setHours(24, 0, 0);
  return new Date(formattedDate);
};
