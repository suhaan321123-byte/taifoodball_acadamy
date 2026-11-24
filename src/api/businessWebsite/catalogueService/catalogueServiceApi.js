import userAxios from "@/lib/axios/axios";

export const addCatalogueServiceCategoryApi = async (data) => {
    const response = await userAxios.post(`/business_website/service/add_catalogue_service_category`, data);
    return response.data; // category
}

export const updateCatalogueServiceCategoryApi = async (data) => {
    const response = await userAxios.put(`/business_website/service/update_catalogue_service_category`, data);
    return response.data; // category
}

export const checkEligibleToDeleteCatalogueServiceCategoryApi = async (data) => {
    const response = await userAxios.post(`/business_website/service/check_eligible_to_delete_catalogue_service_category`, data);
    return response.data; // message
}

export const deleteCatalogueServiceCategoryApi = async (data) => {
    const response = await userAxios.post(`/business_website/service/delete_catalogue_service_category`, data);
    return response.data; // message
}

export const getCatalogueServiceCategoryApi = async (params) => {
    const response = await userAxios.get(`/business_website/service/get_catalogue_service_categories`, { params });
    return response.data; // categories count
}

export const addCatalogueServiceApi = async (data) => {
    const response = await userAxios.post(`/business_website/service/add_catalogue_service`, data);
    return response.data; // 
}

export const updateCatalogueServiceApi = async (data) => {
    const response = await userAxios.put(`/business_website/service/update_catalogue_service`, data);
    return response.data; // 
}

export const getCatalogueServicesApi = async (params) => {
    const response = await userAxios.get(`/business_website/service/get_catalogue_services`, { params });
    return response.data; // catalogueData
}