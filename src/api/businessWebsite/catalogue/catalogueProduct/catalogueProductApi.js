import userAxios from "@/lib/axios/axios";

export const addCatalogueProductItemApi = async (data) => {
  const response = await userAxios.post(
    "/business_website/catalogue/product/add_catalogue_product_item",
    data
  );
  return response.data;
};

export const updateCatalogueProductItemApi = async (id, data) => {
  const response = await userAxios.put(
    `/business_website/catalogue/product/update_catalogue_product_item/${id}`,
    data
  );
  return response.data;
};

export const getCatalogueProductItemsApi = async (params) => {
  const response = await userAxios.get(
    `/business_website/catalogue/product/get_catalogue_product_items`,
    { params }
  );
  return response.data;
};

export const duplicateCatalogueProductItemApi = async (id, data) => {
  const response = await userAxios.post(
    `/business_website/catalogue/product/duplicate_catalogue_product_item/${id}`,
    data
  );
  return response.data;
};

export const deleteCatalogueProductItemApi = async (data) => {
  const response = await userAxios.post(
    `/business_website/catalogue/product/delete_catalogue_product_item`,
    data
  );
  return response.data;
};
