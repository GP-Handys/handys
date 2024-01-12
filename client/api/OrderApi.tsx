import ApiManager from "./ApiManager";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const confirmOrder = async (data:any) => {
  const token = await AsyncStorage.getItem("Authorization");
  try {
    const result = await ApiManager("/orders/place", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      data:data
    });
    return result.data;
  } catch (error: any) {
    return error.message;
  }
};