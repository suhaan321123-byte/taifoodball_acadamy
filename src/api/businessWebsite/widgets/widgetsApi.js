import userAxios from "@/lib/axios/axios";

export const getWidgetsApi = async (params) => {
    const response = await userAxios.get(`/business_website/widget/get_widgets`, { params }); 
    return response.data;
}

export const installWidgetApi = async (data) => {
    const response = await userAxios.post(`/business_website/widget/install_widget`, data);
    return response.data;
}

export const updateInstalledWidgetVersionApi = async (data) => {
    const response = await userAxios.post(`/business_website/widget/update_installed_widget_version`, data);
    return response.data;
}

export const deleteWidgetApi = async (data) => {
    const response = await userAxios.post(`/business_website/widget/delete_installed_widget`, data);
    return response.data;
}

export const getWidgetDetailsApi = async (params) => {
    const response = await userAxios.get(`/business_website/widget/get_widget_details`, { params }); 
    return response.data;
}

export const updateWidgetDetailsApi = async (data) => {
    const response = await userAxios.post(`/business_website/widget/update_widget_details`, data);
    return response.data;
}