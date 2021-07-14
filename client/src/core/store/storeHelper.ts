import type { StoreType } from "./store";

let store: StoreType;

export const getStore = () => {
  return store;
};

export const setStore = (_store: StoreType) => {
  store = _store;
};
