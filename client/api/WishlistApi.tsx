import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManager from "./ApiManager";

export const getWishList = async (data:string) => {
  let token = await AsyncStorage.getItem("Authorization");
  try {
    const result = await ApiManager("/wishlist/get/"+data, {
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

export const addToWishList = async (ItemId: number) => {
  let token = await AsyncStorage.getItem("Authorization");
  try {
    const result = await ApiManager("/wishlist/add/" + ItemId, {
      method: "post",
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

export const removeFromWishList = async (ItemId: number) => {
  let token = await AsyncStorage.getItem("Authorization");
  try {
    const result = await ApiManager("/wishlist/delete/" + ItemId, {
      method: "delete",
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
