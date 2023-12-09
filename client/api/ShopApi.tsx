import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManager from "./ApiManager";

export const getShops = async (userId: any) => {
  let token = await AsyncStorage.getItem("Authorization");
  try {
    const result = await ApiManager("/shop/getUserShops/" + userId, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
    });
    return result.data;
  } catch (error: any) {
    return error.message;
  }
};

export const createShop = async (data: any) => {
  let token = await AsyncStorage.getItem("Authorization");
  try {
    const result = await ApiManager("/shop/create", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
      data: data,
    });
    return result;
  } catch (error: any) {
    return error.message;
  }
};
