import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManager from "./ApiManager";

export const getCart = async () => {
  let token = await AsyncStorage.getItem("Authorization");
  try {
    const result = await ApiManager("/cart/get", {
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

export const addToCart = async (ItemId: number, customization = "") => {
  let token = await AsyncStorage.getItem("Authorization");
  try {
    const result = await ApiManager("/cart/add/" + ItemId, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: { customization },
    });

    return result.data;
  } catch (error: any) {
    return error.message;
  }
};

export const removeFromcart = async (cartId: number) => {
  let token = await AsyncStorage.getItem("Authorization");
  try {
    const result = await ApiManager("/cart/delete/" + cartId, {
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

export const editQuantity = async (cartId: number, quantity: number) => {
  let token = await AsyncStorage.getItem("Authorization");
  try {
    const result = await ApiManager(`/cart/update/${cartId}/${quantity + 1}`, {
      method: "PUT",
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

export const clearCart = async () => {
  let token = await AsyncStorage.getItem("Authorization");
  try {
    const result = await ApiManager("/cart/clear", {
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
