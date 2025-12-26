import API from "./api";

export const searchProductsApi = async (query) => {
  const { data } = await API.get(`/products/search?query=${query}`);
  return data;
};
