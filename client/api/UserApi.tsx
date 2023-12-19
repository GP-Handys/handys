import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManager from "./ApiManager";

export const loginUser = async (data: any) => {
  try {
    const result = await ApiManager("/users/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    });
    return result;
  } catch (error: any) {
    return error.message;
  }
};

export const signupUser = async (data: any) => {
  try {
    const result = await ApiManager("/users/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    });
    return result;
  } catch (error: any) {
    return error.message;
  }
};

export const getProfile = async () => {
  try {
    let token = await AsyncStorage.getItem("Authorization");
    const result = await ApiManager("/users/profile", {
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
export const getUserById = async (userId: number) => {
  try {
    let token = await AsyncStorage.getItem("Authorization");
    const result = await ApiManager("/users/getUser/" + userId, {
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
