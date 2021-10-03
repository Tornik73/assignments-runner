import { isEmpty, isNumber } from "../utils";

const defaultCounterSymbol = Symbol("defaultCounter");

const countersStore = [
  {
    name: defaultCounterSymbol,
    value: 0,
  },
];

export function counter(...args) {
  if (args.length > 1) {
    return countersStore[countersStore.length - 1].value++;
  }

  if (isEmpty(args)) {
    return countersStore[0].value++;
  }

  if (typeof args[0] === "string") {
    const counterIndex = countersStore.findIndex(
      (counter) => counter.name === args[0]
    );
    if (counterIndex === -1) {
      countersStore.push({ value: 0, name: args[0] });
      return 0;
    }
    return countersStore[counterIndex].value++;
  }
  if (isNumber(args[0])) {
    return args[0];
  }
}

export function callableMultiplier(...args) {
  if (isEmpty(args)) {
    return null;
  }

  const sum = (...args) =>
    args.reduce((acc, item) => {
      return acc * item;
    }, 1);

  const reduceValue = (args) =>
    args.reduce((acc, a) => {
      return sum(acc, a);
    }, 1);

  return (...carryArgs) => {
    if (isEmpty(carryArgs)) {
      return reduceValue(args);
    }
    return callableMultiplier(...args, reduceValue(carryArgs, 1));
  };
}

export function createCalculator() {
  // TODO:
  throw "Not implemented";
}
