import { isNumber, isNumberArray } from "../utils";

export function add(a, b) {
  const isNumbersArray = isNumberArray([a, b]);

  return isNumbersArray ? a + b : null;
}

export function subtract(a, b) {
  const isNumbersArray = isNumberArray([a, b]);

  return isNumbersArray ? a - b : null;
}

export function complex(a, b) {
  const isNumbersArrays = isNumberArray(a) && isNumberArray(b);

  if (!isNumbersArrays) {
    return null;
  }

  const result = Math.pow(a[0] * a[1], b[0] / b[1]);

  const isValidResult = isNumber(result);

  return isValidResult ? result : null;
}
