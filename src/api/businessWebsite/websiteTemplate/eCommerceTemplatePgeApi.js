import userAxios from "@/lib/axios/axios";
import customerAxios from "@/lib/axios/customerAxios";

// Get catalogue  by account type id,
export const getPublishedWebCatalogueByAccountTypeId = async (params) => {
  const response = await customerAxios.get(
    "/business_website/catalogue/get_catalogue_by_account_type_id",
    { params }
  );

  return response.data;
};

// Get categories by account type id, catalogue id
export const getPublishedWebCategoryByCatalogueId = async (params) => {
  const response = await customerAxios.get(
    "/business_website/catalogue/get_product_categories_by_account_type_id",
    { params }
  );

  return response.data;
};



// Fetch products for a catalogue (public view)
export const getPublishedWebProductsByCatalogueId = async (params) => {
  try {
    const response = await customerAxios.get(
      "/business_website/catalogue/product/get_catalogue_product_items_for_public",
      { params }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getPublishedWebServiceByCatalogueId = async (params) => {
  try {
    const response = await customerAxios.get(
      "/business_website/catalogue/product/get_catalogue_service_items_for_public",
      { params }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};



export const getPublishedWebServiceCategoryByCatalogueId = async (params) => {
  const response = await customerAxios.get(
    "/business_website/catalogue/get_service_categories_by_account_type_id",
    { params }
  );

  return response.data;
};

export const getCatalogueProductDetailsApi = async (params) => {
  const response = await customerAxios.get(
    "/business_website/catalogue/product/get_catalogue_product_details_for_public",
    { params }
  );
  return response.data;
};


export const getCatalogueServiceDetailsApi = async (params) => {
  const response = await userAxios.get(
    "/business_website/catalogue/service/get_catalogue_service_details_for_public",
    { params }
  );
  return response.data;
};

export const getCatalogueServiceDetailsBySlugApi = async (params) => {
  const response = await userAxios.get(
    "/business_website/catalogue/service/get_catalogue_service_details_for_public_by_slug",
    { params }
  );
  return response.data;
};
