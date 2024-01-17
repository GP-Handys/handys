import ApiManager from "./ApiManager";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const submitShopRating = async (shopId: number, rating: number) => {
  const token = await AsyncStorage.getItem("Authorization");
  try {
    const result = await ApiManager("/shop/rating/add/" + shopId, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: { rating: rating },
    });
    return result;
  } catch (error: any) {
    return error.message;
  }
};

export const submitItemRating = async (itemId: number, rating: number) => {
  const token = await AsyncStorage.getItem("Authorization");
  try {
    const result = await ApiManager("/item/rating/add/" + itemId, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: { rating: rating },
    });
    return result;
  } catch (error: any) {
    return error.message;
  }
};
