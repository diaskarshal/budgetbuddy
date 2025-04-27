import { $authHost } from "./index";

export const fetchStats = async () => {
  try {
    const { data } = await $authHost.get("api/transaction/stats");
    return data;
  } catch (error) {
    console.error("Error fetching stats:", error);
    throw error;
  }
};
