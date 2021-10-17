import { isEmpty, isNumber } from "../utils";

const defaultCounterSymbol = Symbol("defaultCounter");

const IncrementCounterModeEnum = Object.freeze({
  default: 1,
  last: 2,
});

const countersStore = {
  incrementCounterMode: IncrementCounterModeEnum.default,
  counters: [
    {
      name: defaultCounterSymbol,
      value: 0,
    },
  ],
};

const countersSlice = {
  add(value, name) {
    const index = countersStore.counters.findIndex(
      (item) => item.name === name && item.name !== undefined
    );

    if (index > -1) {
      if (value && name) {
        countersStore.counters[index].value = value;
        return value;
      }

      countersStore.counters[index].value += value ? value : 1;
      return countersStore.counters[index].value;
    }

    countersStore.counters.push({ name, value });

    return value;
  },

  incrementByIndex(index) {
    countersStore.counters[index].value += 1;

    return countersStore.counters[index].value;
  },

  incrementLast() {
    const lastElement =
      countersStore.counters[countersStore.counters.length - 1];
    lastElement.value += 1;

    return lastElement.value;
  },
};

export function counter(...args) {
  const incrementCounterMode = countersStore.incrementCounterMode;

  const isDefaultIncrementMode =
    incrementCounterMode === IncrementCounterModeEnum.default;

  const isLastIncrementMode =
    incrementCounterMode === IncrementCounterModeEnum.last;

  const isEmptyArguments = isEmpty(args);

  if (isEmptyArguments) {
    if (isDefaultIncrementMode) {
      const prevValue = countersStore.counters[0].value;
      countersSlice.incrementByIndex(0);
      return prevValue;
    }

    if (isLastIncrementMode) {
      return countersSlice.incrementLast();
    }
    return;
  }

  if (typeof args[0] === "string") {
    countersStore.incrementCounterMode = IncrementCounterModeEnum.default;
    countersStore.counters[0].value = 0;

    return countersSlice.add(0, args[0]);
  }

  if (isNumber(args[0]) && typeof args[1] === "string") {
    return countersSlice.add(args[0], args[1]);
  }

  if (isNumber(args[0])) {
    countersStore.incrementCounterMode = IncrementCounterModeEnum.last;
    return countersSlice.add(args[0]);
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

const OperationEnum = Object.freeze({
  init: "init",
  add: "add",
  subtract: "subtract",
  add: "add",
  multiply: "multiply",
  divide: "divide",
});

export function createCalculator(inputValue) {
  const initialValue = inputValue ?? 0;

  return Object.defineProperties(
    {
      log: [{ operation: OperationEnum.init, value: initialValue }],
      currentValue: initialValue,
      add: function (value) {
        this.log.push({ operation: OperationEnum.add, value });
        this.currentValue += value;
      },
      subtract: function (value) {
        this.log.push({ operation: OperationEnum.subtract, value });
        this.currentValue -= value;
      },
      multiply: function (value) {
        this.log.push({ operation: OperationEnum.multiply, value });
        this.currentValue *= value;
      },
      divide: function (value) {
        this.log.push({ operation: OperationEnum.divide, value });
        this.currentValue /= value;
      },
    },
    {
      value: {
        set: function () {
          return;
        },
        get: function () {
          return this.currentValue;
        },
      },
    }
  );
}
