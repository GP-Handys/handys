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
