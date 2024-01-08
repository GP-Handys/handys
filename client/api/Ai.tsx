import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManager from "./ApiManager";

export const generateImage = async (prompt: string) => {
  const token = await AsyncStorage.getItem("Authorization");
  try {
    const result = await ApiManager("/ai/generate?prompt=" + prompt, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return result;
  } catch (error: any) {
    return error.message;
  }
};

export const getHistoryForUser = async () => {
  const token = await AsyncStorage.getItem("Authorization");
  try {
    const result = await ApiManager("/ai/images", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return result;
  } catch (error: any) {
    return error.message;
  }
};
