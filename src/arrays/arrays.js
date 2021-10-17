import { isNumber } from "../utils";

export function mapTo(arr, arg) {
  if (!arg) {
    return arr.map((_, index) => index);
  }

  if (typeof arg === "string") {
    return arr.reduce((acc, item) => {
      if (item[arg]) {
        return [...acc, item[arg]];
      }
      return acc;
    }, []);
  }
}

export function mapToProfile(arr) {
  return arr.reduce((acc, item) => {
    const fullname =
      item.name || item.surname
        ? `${item.name ?? "_"} ${item.surname ?? "_"}`
        : null;

    const obj = Object.defineProperties(
      {
        name: item.name ?? null,
        surname: item.surname ?? null,
        fullname,
        age: item.age ?? null,
      },
      {
        isOld: {
          get: function () {
            return this.age >= 18;
          },
        },
        isAnonymous: {
          get: function () {
            return Array.from([
              this.name,
              this.surname,
              this.age,
              this.fullname,
            ]).every((item) => !Boolean(item));
          },
        },
      }
    );
    return [...acc, obj];
  }, []);
}

export function filterBy(arr, arg) {
  if (isNumber(arg)) {
    return arr.filter((item) => item >= arg);
  }

  if (typeof arg === "string") {
    return arr.filter((item) => item[arg]);
  }

  if (typeof arg === "object") {
    return arr.filter((item) => arg.filterCb(item[arg.property]));
  }
}

export function reduceTo(inputList, keys) {
  if (!keys) {
    return inputList.reduce((acc, item) => acc + item, 0);
  }

  if (typeof keys === "string") {
    return inputList.reduce((acc, item) => acc + item[keys], 0);
  }

  const sums = keys.map((key) => {
    const sum = inputList.reduce((inputListAcc, inputListItem) => {
      return inputListAcc + inputListItem[key];
    }, 0);

    return sum;
  });

  return sums;
}

export function sort(list, keys) {
  if (!keys) {
    return list.sort((a, b) => a - b);
  }

  if (typeof keys === "string") {
    return list.sort((a, b) => a[keys] - b[keys]);
  }

  return list.sort((a, b) => {
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const field = key.field ? key.field : key;
      const order = key.order ? key.order : null;
      const isDescSort = order === "desc";

      if (a[field] > b[field]) {
        return isDescSort ? -1 : 1;
      }
      if (a[field] < b[field]) {
        return isDescSort ? 1 : -1;
      }
    }
    return 0;
  });
}

export function complex(values, params) {
  let resultValues = values;
  params.forEach(({ operation, callback, property, order }) => {
    switch (operation) {
      case "filter": {
        resultValues = resultValues.filter((value) =>
          callback(value[property])
        );
        break;
      }

      case "map": {
        resultValues = resultValues.map((value) => value[property]);
        break;
      }

      case "reduce": {
        resultValues = resultValues.reduce(
          (acc, value) => acc + value[property],
          0
        );
        break;
      }

      case "sort": {
        resultValues = resultValues.sort((a, b) => {
          const isDescSort = order === "desc";

          if (a > b) {
            return isDescSort ? -1 : 1;
          }
          if (a < b) {
            return isDescSort ? 1 : -1;
          }
        });
        break;
      }

      default:
        return null;
    }
  });

  return resultValues;
}
