import ApiManager from "./ApiManager";

export const addPost = async (data: any) => {
  try {
    const result = await ApiManager("community/addPost", {
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

export const getPost = async (data: any) => {
  try {
    const result = await ApiManager("community/posts", {
      method: "get",
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
