import userAxios from "@/lib/axios/axios";

export const getRobotsDataApi = async (params) => {
    const response = await userAxios.get(`/business_website/robots/get_robots`, { params});
    return response.data;
}

export const updateRobotsDataApi = async (data) => {
    const response = await userAxios.post(`/business_website/robots/update_robots`,data);
    return response.data;
}