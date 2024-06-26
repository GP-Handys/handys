import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManager from "./ApiManager";

export const getShopsForUserId = async (userId: any) => {
  let token = await AsyncStorage.getItem("Authorization");
  try {
    const result = await ApiManager("/shop/getUserShops/" + userId, {
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

export const createShop = async (data: any) => {
  let token = await AsyncStorage.getItem("Authorization");
  try {
    const result = await ApiManager("/shop/create", {
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

export const shopSearch = async (data: any) => {
  let token = await AsyncStorage.getItem("Authorization");
  try {
    const result = await ApiManager("/shop/search?search=" + data, {
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

export const getRecommendedShops = async () => {
  const token = await AsyncStorage.getItem("Authorization");
  try {
    const result = await ApiManager("/shop/recommended", {
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

export const getShopById = async (shopId: any) => {
  const token = await AsyncStorage.getItem("Authorization");
  try {
    const result = await ApiManager("/shop/read/" + shopId, {
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

export const subToPremium = async (shopId: any) => {
  const token = await AsyncStorage.getItem("Authorization");
  try {
    const result = await ApiManager("/shop/subscribe/" + shopId, {
      method: "post",
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
