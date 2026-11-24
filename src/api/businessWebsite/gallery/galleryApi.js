import userAxios from "@/lib/axios/axios";

export const updateGalleryApi = async (data) => {
    const response = await userAxios.post(`/business_website/gallery/update_gallery`, data ); 
    return response.data; 
}

export const createGalleryApi = async (data) => {
    const response = await userAxios.post(`/business_website/gallery/create_gallery`, data ); 
    return response.data; 
}

export const getGalleryApi = async (params) => {
    const response = await userAxios.get(`/business_website/gallery/get_gallery`, { params }); 
    return response.data; 
}

export const deleteGalleryApi = async (data) => {
    const response = await userAxios.post(`/business_website/gallery/delete_gallery`, data ); 
    return response.data;
}

export const getPublishedGalleryApi = async (params) => {
    const response = await userAxios.get(`/business_website/gallery/get_published_gallery`, { params }); 
    return response.data; 
}


export const createPostCategoryApi = async (data) => {
  const response = await userAxios.post(
    `/business_website/gallery/create_category`,
    data
  );
  return response.data;
};

// ✅ Update Category
export const updatePostCategoryApi = async (data) => {
  const response = await userAxios.post(
    `/business_website/gallery/update_category`,
    data
  );
  return response.data;
};

// ✅ Get Categories
export const getPostCategoriesApi = async (params) => {
  const response = await userAxios.get(
    `/business_website/gallery/get_categories`,
    { params }
  );
  return response.data;
};