import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManager from "./ApiManager";

export const submitTicket = async (data: any) => {
  try {
    const token = await AsyncStorage.getItem("Authorization");
    const result = await ApiManager("/ticket/submitTicket", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: data,
    });
    return result;
  } catch (error: any) {
    return error.message;
  }
};
