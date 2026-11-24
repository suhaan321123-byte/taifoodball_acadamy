import userAxios from "@/lib/axios/axios";

export const createCatalogApi = async (data) => {
    const response = await userAxios.post(`/business_website/catalogue/add_catalogue`, data );
    return response.data;
}

export const getCatalogsApi = async (params) => {
    const response = await userAxios.get(`/business_website/catalogue/get_catalogue`, { params });
    return response.data; // data
}


export const getCatalogCategories = async (params) => {
    const response = await userAxios.get(`/business_website/catalogue/get_catalogue_categories`, { params });
    return response.data; // data
}

export const updateCatalogApi = async (data) => {
    const response = await userAxios.put(`/business_website/catalogue/update_catalogue`, data );
    return response.data; // data
}

export const createCatalogCategoryApi = async (data) => {
    const response = await userAxios.post(`/business_website/catalogue/add_catalogue_category`, data );
    return response.data; // data
}

export const updateCatalogCategoryApi = async (data) => {
    const response = await userAxios.post(`/business_website/catalogue/update_catalogue_category`, data );
    return response.data; // data
}

//duplicate the Catalogue by catalogue Id 
export const duplicateCatalogueApi = async (id, data) => {
  const response = await userAxios.post(
    `/business_website/catalogue/duplicate_catalogue_item/${id}`,
    data
  );
  return response.data;
}; 


//delete catalogue by id 
export const deleteCatalogueApi = async (data) => {
  const response = await userAxios.post(
    `/business_website/catalogue/delete_catalogue_item`,
    data
  );
  return response.data;
};

export const getCatalogServiceItemsApi = async (params) => {
    const response = await userAxios.get(`/business_website/catalogue/get_all_service_catalogue_items`, { params });
    return response.data; // items
}

export const getCatalogProductItemsApi = async (params) => {
    const response = await userAxios.get(`/business_website/catalogue/get_all_product_catalogue_items`, { params });
    return response.data; // items
}

export const deleteCatalogCategoryApi = async (data) => {
    const response = await userAxios.post(`/business_website/catalogue/delete_catalogue_category`, data );
    return response.data; // data
}