import ApiManager from "./ApiManager";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const addPost = async (data: any) => {
  const token = await AsyncStorage.getItem("Authorization");
  try {
    const result = await ApiManager("community/addPost", {
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

export const getPosts = async () => {
  const token = await AsyncStorage.getItem("Authorization");

  try {
    const result = await ApiManager("community/posts", {
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
export const getComments = async (postId:number) => {
  const token = await AsyncStorage.getItem("Authorization");
  try {
    const result = await ApiManager("community/comment/"+postId, {
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
