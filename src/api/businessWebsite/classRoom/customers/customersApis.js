// import customerAxios from "../lib/axios/customerAxios";

import customerAxios from "../../../../lib/axios/customerAxios";

/**
 * Fetch course categories based on account type
 * @param {string} accountTypeId - The account type ID to fetch related course categories
 * @returns {Promise<Object>} Course categories data
 */
// Updated API with search and pagination support
export const getCourseCategoriesByAccountTypeApi = async (
  accountTypeId,
  page = 1,
  limit = 12,
  search = "",
) => {
  const response = await customerAxios.get(
    `/business_website/class_room/customer/get_course_categories`,
    {
      params: {
        accountTypeId,
        page,
        limit,
        search,
      },
    },
  );
  return response.data;
};

/**
 * Fetch courses by category with search, pagination, and filtering
 * @param {string} accountTypeId - The account type ID
 * @param {string} categoryId - The category ID to fetch courses for
 * @param {string} search - Search query
 * @param {string} filter - Course type filter
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @param {string} sort - Sort option
 * @returns {Promise<Object>} Courses data
 */
export const getCoursesByCategoryApi = async (
  accountTypeId,
  categoryId,
  search = "",
  page = 1,
  limit = 12,
  sort = "name",
  type = "all",
) => {
  const response = await customerAxios.get(`/business_website/class_room/customer/get_courses`, {
    params: {
      accountTypeId,
      categoryId,
      search,
      page,
      limit,
      sort,
      type,
    },
  });
  return response.data;
};
// api/courseApi.js

/**
 * Fetch course sections by course ID
 * @param {string} courseId - The course ID
 * @returns {Promise<Object>} Sections data
 */
export const getCourseSectionsByCourseApi = async (courseId, accountTypeId, customerId) => {
  const response = await customerAxios.get(
    `/business_website/class_room/customer/get_course_sections_by_course`,
    {
      params: { courseId, accountTypeId, customerId },
    },
  );
  return response.data;
};

/**
 * Fetch course section materials by section ID
 * @param {string} sectionId - The section ID
 * @returns {Promise<Object>} Materials data
 */
export const getCourseSectionMaterialsApi = async (
  courseSectionId,
  courseId,
  accountTypeId,
  customerId,
) => {
  const response = await customerAxios.get(
    `/business_website/class_room/customer/get_course_section_materials`,
    {
      params: { courseSectionId, courseId, accountTypeId, customerId },
    },
  );
  return response.data;
};

/**
 * Fetch material details by material ID
 * @param {string} materialId - The material ID
 * @returns {Promise<Object>} Material details data
 */
export const getMaterialDetailsApi = async (materialId) => {
  const response = await customerAxios.get(
    `/business_website/class_room/customer/material/${materialId}/details`,
  );
  return response.data;
};

/**
 * Fetch material playback URL by material ID
 * @param {string} materialId - The material ID
 * @returns {Promise<Object>} Playback URL data
 */
export const getMaterialPlaybackUrlApi = async (materialId) => {
  const response = await customerAxios.get(
    `/business_website/class_room/customer/material/${materialId}/playback`,
  );
  return response.data;
};

/**
 * Fetch popular courses by course IDs
 * @param {string} accountTypeId - The account type ID
 * @param {string} courseIds - Comma separated course IDs
 * @returns {Promise<Object>} Courses data
 */
export const getGroupsOfCoursesApi = async (params) => {
  const response = await customerAxios.get(`/business_website/class_room/customer/get_courses`, {
    params: params,
  });
  return response.data;
};

export const getMyCourseSubscriptionsApi = async (accountTypeId) => {
  const response = await customerAxios.get(
    `/business_website/class_room/customer/my_course_subscriptions`,
    {
      params: { accountTypeId },
    },
  );
  return response.data;
};

export const registerCourseApi = async (data) => {
  const response = await customerAxios.post(
    `/business_website/class_room/customer/register_course`,
    data,
  );
  return response.data;
};

export const getCourseSubscriptionPaymentAttemptApi = async (attemptId) => {
  const response = await customerAxios.get(
    `/business_website/class_room/public/subscription_payment/${attemptId}`,
  );
  return response.data;
};

export const verifyCourseSubscriptionPaymentApi = async (data) => {
  const response = await customerAxios.post(
    `/business_website/class_room/public/subscription_payment/verify`,
    data,
  );
  return response.data;
};

/**
 * Fetch featured (event) posts by account type
 * @param {string} accountTypeId - The account type ID
 * @param {number} [limit=10] - Number of events per page
 * @param {number} [page=1] - Page number
 * @returns {Promise<Object>} Event posts data
 */
export const getEventPostsApi = async (
  accountTypeId,
  limit = 10,
  page = 1,
  featured = false,
  search = "",
) => {
  const response = await customerAxios.get(
    `/business_website/class_room/customer/posts/get_event_posts`,
    {
      params: {
        accountTypeId,
        limit,
        page,
        featured,
        search,
      },
    },
  );
  return response.data;
};

export const getActiveWebsiteReviewsApi = async (params) => {
  const response = await customerAxios.get(`/business_website/review/get_active_reviews`, {
    params,
  });
  return response.data; // { message, reviews, count }
};
export const getEventPostDetailsApi = async (params) => {
  const response = await customerAxios.get(
    `/business_website/class_room/customer/posts/get_event_post_details`,
    {
      params,
    },
  );
  return response.data; // { message, post }
};
