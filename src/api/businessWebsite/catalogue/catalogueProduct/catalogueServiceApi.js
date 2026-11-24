import userAxios from "@/lib/axios/axios";

export const addCatalogueServiceItemApi = async (data) => {
  const response = await userAxios.post(
    "/business_website/catalogue/service/add_catalogue_service_item",
    data
  );
  return response.data;
};

export const updateCatalogueServiceItemApi = async (id, data) => {
  const response = await userAxios.put(
    `/business_website/catalogue/service/update_catalogue_service_item/${id}`,
    data
  );
  return response.data;
};

export const getCatalogueServiceItemsApi = async (params) => {
  const response = await userAxios.get(
    `/business_website/catalogue/service/get_catalogue_service_items`,
    { params }
  );
  return response.data;
};

export const duplicateCatalogueServiceItemApi = async (id, data) => {
  const response = await userAxios.post(
    `/business_website/catalogue/service/duplicate_catalogue_service_item/${id}`,
    data
  );
  return response.data;
};

export const deleteCatalogueServiceItemApi = async (data) => {
  const response = await userAxios.post(
    `/business_website/catalogue/service/delete_catalogue_service_item`,
    data
  );
  return response.data;
};
