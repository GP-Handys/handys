import ApiManager from "./ApiManager";

export const getItem = async (data: any) => {
    try {
      const result = await ApiManager("/items/getItem/:itemId", {
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