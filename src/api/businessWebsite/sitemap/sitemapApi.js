import userAxios from "@/lib/axios/axios";

export const getGeneratedSitemapFilesApi = async (params) => {
    const response = await userAxios.get(`/business_website/sitemap/get_generated_sitemap`, { params});
    return response.data;
}

export const autoGenerateSitemapApi = async (data) => {
    const response = await userAxios.post(`/business_website/sitemap/autogenerate_sitemap`,data);
    return response.data;
}