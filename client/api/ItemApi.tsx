import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManager from "./ApiManager";

export const getMostPopularItems = async () => {
  let token = await AsyncStorage.getItem("Authorization");
  try {
    const result = await ApiManager("/item/getRandomItems", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
    });
    return result;
  } catch (error: any) {
    return error.message;
  }
};

export const getItemsForShopId = async (shopId: any) => {
  let token = await AsyncStorage.getItem("Authorization");
  try {
    const result = await ApiManager("/items/getByShop/" + shopId, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
    });
    return result;
  } catch (error: any) {
    return error.message;
  }
};

export const addItemForShopId = async (shopId: number, data: any) => {
  let token = await AsyncStorage.getItem("Authorization");
  try {
    const result = await ApiManager("/items/addItem/" + shopId, {
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
