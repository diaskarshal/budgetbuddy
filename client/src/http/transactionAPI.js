import { $authHost } from "./index";

export const fetchTypes = async () => {
  try {
    const { data } = await $authHost.get("api/transaction/types");
    return data;
  } catch (error) {
    console.error('Error fetching types:', error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const { data } = await $authHost.get("api/category");
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const createTransaction = async (transaction) => {
  try {
    const { data } = await $authHost.post("api/transaction", transaction);
    return data;
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
};

export const fetchTransactions = async () => {
  try {
    const { data } = await $authHost.get("api/transaction");
    return data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};
