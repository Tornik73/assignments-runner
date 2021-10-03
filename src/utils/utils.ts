export const isNumber = (value) =>
  !Number.isNaN(value) && Number.isFinite(value) && typeof value === "number";

export const isNumberArray = (value) => value.every(isNumber);

export const isEmpty = (value) => value.length === 0;
