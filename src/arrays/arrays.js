import { checkIsNumber } from "../utils";

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

    Object.defineProperties(
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
  if (checkIsNumber(arg)) {
    return arr.filter((item) => item >= arg);
  }

  if (typeof arg === "string") {
    return arr.filter((item) => item[arg]);
  }

  if (typeof arg === "object") {
    return arr.filter((item) => arg.filterCb(item[arg.property]));
  }
}

export function reduceTo() {
  // TODO:
  throw "Not implemented";
}

export function sort() {
  // TODO:
  throw "Not implemented";
}

export function complex() {
  // TODO:
  throw "Not implemented";
}
