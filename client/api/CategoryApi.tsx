import ApiManager from "./ApiManager";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getCategories = async () => {
  const token = await AsyncStorage.getItem("Authorization");
  try {
    const result = await ApiManager("category/get", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return result.data;
  } catch (error: any) {
    return error.message;
  }
};