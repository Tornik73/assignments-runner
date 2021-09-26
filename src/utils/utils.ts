export const checkIsNumber = (value) =>
  !Number.isNaN(value) && Number.isFinite(value) && typeof value === "number";

export const checkIsNumberArray = (value) => value.every(checkIsNumber);

export const isEmpty = (value) => value.length === 0;
