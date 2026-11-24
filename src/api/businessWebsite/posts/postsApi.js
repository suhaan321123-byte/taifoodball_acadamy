import userAxios from "@/lib/axios/axios";

export const updatePostsApi = async (data) => {
    const response = await userAxios.post(`/business_website/post/update_posts`, data ); 
    return response.data; 
}

export const createPostsApi = async (data) => {
    const response = await userAxios.post(`/business_website/post/create_posts`, data ); 
    return response.data; 
}

export const getPostsApi = async (params) => {
    const response = await userAxios.get(`/business_website/post/get_posts`, { params }); 
    return response.data; 
}

export const deletePostsApi = async (data) => {
    const response = await userAxios.post(`/business_website/post/delete_posts`, data ); 
    return response.data;
}

export const getPublishedPostsApi = async (params) => {
    const response = await userAxios.get(`/business_website/post/get_published_posts`, { params }); 
    return response.data; 
}