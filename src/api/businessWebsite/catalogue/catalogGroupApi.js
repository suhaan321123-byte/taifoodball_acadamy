import userAxios from "@/lib/axios/axios";

export const getCatalogGroupsApi = async (params) => {
    const response = await userAxios.get(`/business_website/catalogue/catalog_group/get_catalog_groups`, { params });
    return response.data; // data
}


export const getCatalogAndGroupsApi = async (params) => {
    const response = await userAxios.get(`/business_website/catalogue/catalog_group/get_combined_catalogue_and_group_items`, { params });
    return response.data; 
}
export const addCatalogGroupApi = async (data) => {
    const response = await userAxios.post(`/business_website/catalogue/catalog_group/add_catalog_group`, data);
    return response.data; // data
}

export const updateCatalogGroupApi = async (id, data) => {
    const response = await userAxios.put(`/business_website/catalogue/catalog_group/update_catalog_group/${id}`, data);
    return response.data; // data
}

export const deleteCatalogGroupApi = async (id, accountTypeId) => {
    const response = await userAxios.delete(`/business_website/catalogue/catalog_group/delete_catalog_group/${id}/${accountTypeId}`);
    return response.data; // data
}

export const updateCatalogGroupStatusApi = async (id, data) => {
    const response = await userAxios.patch(`/business_website/catalogue/catalog_group/update_catalog_group_status/${id}`, data);
    return response.data; // data
}

export const getCatalogGroupItemsApi = async (params) => {
    const response = await userAxios.get(`/business_website/catalogue/catalog_group/get_catalog_group_items`, { params });
    return response.data; // data
}

export const getCatalogGroupPublishedItemsApi = async (params) => {
    const response = await userAxios.get(`/business_website/catalogue/catalog_group/get_catalog_group_published_items`, { params });
    return response.data; // data
}