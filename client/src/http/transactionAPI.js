import { $authHost } from "./index";

export const fetchTypes = async () => {
  const { data } = await $authHost.get("api/");
  return data;
};

export const fetchCategories = async () => {
  const { data } = await $authHost.get("api/brand");
  return data;
};

export const createTransaction = async (transaction) => {
  const { data } = await $authHost.post("api/transaction", transaction);
  return data;
};

export const fetchTransactions = async () => {
  const { data } = await $authHost.get("api/transaction", {
    params: {},
  });
  return data;
};

// export const fetchOneDevice = async (id) => {
//   const { data } = await $authHost.get("api/device/" + id);
//   return data;
// };
