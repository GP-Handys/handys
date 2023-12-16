import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManager from "./ApiManager";

export const getMostPopularItems = async () => {
  let token = await AsyncStorage.getItem("Authorization");
  try {
    const result = await ApiManager("/item/getRandomItems", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
    });
    return result;
  } catch (error: any) {
    return error.message;
  }
};
