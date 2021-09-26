import { checkIsNumber, checkIsNumberArray } from "../utils";

export function add(a, b) {
  const isNumbersArray = checkIsNumberArray([a, b]);

  return isNumbersArray ? a + b : null;
}

export function subtract(a, b) {
  const isNumbersArray = checkIsNumberArray([a, b]);

  return isNumbersArray ? a - b : null;
}

export function complex(a, b) {
  const isNumbersArrays = checkIsNumberArray(a) && checkIsNumberArray(b);

  if (!isNumbersArrays) {
    return null;
  }

  const result = Math.pow(a[0] * a[1], b[0] / b[1]);

  const isValidResult = checkIsNumber(result);

  return isValidResult ? result : null;
}
