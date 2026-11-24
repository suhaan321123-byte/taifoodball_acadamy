import userAxios from "@/lib/axios/axios";

export const getInstalledAnalyticsMarketingApi = async (params) => {
    const response = await userAxios.get(`/business_website/analytics_marketing/get_installed_analytics_marketing`, { params }); 
    return response.data;
}

export const installAnalyticsMarketingApi = async (data) => {
    const response = await userAxios.post(`/business_website/analytics_marketing/install_analytics_marketing`, data); 
    return response.data;
}

export const updateInstalledAnalyticsMarketingApi = async (data) => {
    const response = await userAxios.post(`/business_website/analytics_marketing/update_installed_analytics_marketing`, data); 
    return response.data;
}

export const deleteInstalledAnalyticsMarketingApi = async (data) => {
    const response = await userAxios.post(`/business_website/analytics_marketing/delete_installed_analytics_marketing`, data); 
    return response.data;
}