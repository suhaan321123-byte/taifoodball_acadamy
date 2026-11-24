import userAxios from "@/lib/axios/axios";

export const getCourseCategoriesApi = async (params) => {
  const response = await userAxios.get(
    `/business_website/class_room/provider/get_courses_categories`,
    { params }
  );
  return response.data;
};

export const createCourseCategoryApi = async (data) => {
  const response = await userAxios.post(
    `/business_website/class_room/provider/create_course_category`,
    data
  );
  return response.data;
};

export const updateCourseCategoryApi = async (data) => {
  const response = await userAxios.post(
    `/business_website/class_room/provider/update_course_category`,
    data
  );
  return response.data;
};

export const deleteCourseCategoryApi = async (data) => {
  const response = await userAxios.post(
    `/business_website/class_room/provider/delete_course_category`,
    data
  );
  return response.data;
};

// course
export const providerCreateCourseApi = async (data) => {
  const response = await userAxios.post(
    `/business_website/class_room/provider/create_course`,
    data
  );
  return response.data;
};

export const providerUpdateCourseApi = async (data) => {
  const response = await userAxios.post(
    `/business_website/class_room/provider/update_course`,
    data
  );
  return response.data;
};

export const providerDeleteCourseApi = async (data) => {
  const response = await userAxios.post(
    `/business_website/class_room/provider/delete_course`,
    data
  );
  return response.data;
};

export const getProviderCourseApi = async (params) => {
  const response = await userAxios.get(
    `/business_website/class_room/provider/get_courses`,
    { params }
  );
  return response.data;
};

export const getProviderCourseDetailsApi = async (params) => {
  const response = await userAxios.get(
    `/business_website/class_room/provider/get_course_details`,
    { params }
  );
  return response.data;
};

export const addProviderCourseSectionApi = async (data) => {
  const response = await userAxios.post(
    `/business_website/class_room/provider/add_course_section`,
    data
  );
  return response.data;
};

export const updateProviderCourseSectionApi = async (data) => {
  const response = await userAxios.post(
    `/business_website/class_room/provider/update_course_section`,
    data
  );
  return response.data;
};

export const addProviderCourseSectionMaterialApi = async (data) => {
  const response = await userAxios.post(
    `/business_website/class_room/provider/add_course_section_material`,
    data
  );
  return response.data;
};

export const updateProviderCourseSectionMaterialApi = async (data) => {
  const response = await userAxios.post(
    `/business_website/class_room/provider/update_course_section_material`,
    data
  );
  return response.data;
};

export const deleteProviderCourseSectionMaterialApi = async (data) => {
  const response = await userAxios.post(
    `/business_website/class_room/provider/delete_course_section_material`,
    data
  );
  return response.data;
};

export const deleteProviderCourseSectionApi = async (data) => {
  const response = await userAxios.post(
    `/business_website/class_room/provider/delete_course_section`,
    data
  );
  return response.data;
};

export const coursePrivetS3InitUploadApi = async (file, accountTypeId) => {
  const response = await userAxios.post(
    "/business_website/class_room/upload/init",
    {
      fileName: file.name,
      contentType: file.type || "application/octet-stream",
      folder: "uploads/videos",
      accountTypeId: accountTypeId,
    },
    { withCredentials: true }
  );
  return response.data;
};

export const coursePrivetS3UploadPartUrlApi = async (data) => {
  const { key, uploadId, partNumber, accountTypeId } = data;
  const response = await userAxios.get(
    "/business_website/class_room/upload/part_url",
    {
      params: {
        key,
        uploadId,
        accountTypeId: accountTypeId,
        partNumber,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

export const coursePrivetS3UploadCompleteApi = async (data) => {
  const response = await userAxios.post(
    "/business_website/class_room/upload/complete",
    data,
    { withCredentials: true }
  );
  return response.data;
};

export const coursePrivetS3TranscodeSubmitApi = async (data) => {
  const response = await userAxios.post(
    "/business_website/class_room/transcode/submit",
    data,
    { withCredentials: true }
  );
  return response.data;
}

export const createSubscriptionFromAdminApi = async (data) => {
  const response = await userAxios.post(
    `/business_website/class_room/provider/create_subscription`,
    data
  );
  return response.data;
}

export const providerUpdateSubscriptionApi = async (data) => {
  const response = await userAxios.post(
    `/business_website/class_room/provider/update_subscription`,
    data
  );
  return response.data;
}

export const getCourseProviderSubscriptionsApi = async (params) => {
  const response = await userAxios.get(
    `/business_website/class_room/provider/get_subscription`,
    { params }
  );
  return response.data;
}

export const getCourseUpcomingPaymentRemindersApi = async (params) => {
  const response = await userAxios.get(
    `/business_website/class_room/provider/get_course_upcoming_payment_reminders`,
    { params }
  );
  return response.data;
}

export const getCourseProviderSubscriptionDetailsApi = async (params) => {
  const response = await userAxios.get(
    `/business_website/class_room/provider/get_subscription_details`,
    { params }
  );
  return response.data;
}

export const getProviderCourseSectionLibraryApi = async (params) => {
  const response = await userAxios.get(
    "/business_website/class_room/media/library",
    {
      params,
      withCredentials: true,
    }
  );
  return response.data;
};



export const deleteProviderCourseSectionTranscodeMediaApi = async (payload) => {
  const response = await userAxios.delete(
    "/business_website/class_room/media/delete",
    {
      data: payload, // Send mediaId in request body
      withCredentials: true,
    }
  );
  return response.data;
};

// ✅ Check Transcode Status
export const checkProviderCourseSectionTranscodeStatusApi = async (payload) => {
  const response = await userAxios.post(
    "/business_website/class_room/transcode/check_status",
    payload,
    { withCredentials: true }
  );
  return response.data;
};



// services/api/awsIntegrationApi.js

/**
 * Get signed CloudFront URL for media streaming
 * @param {Object} params - Parameters for signed URL generation
 * @param {string} params.accountTypeId - Account type identifier
 * @param {string} params.path - File path in S3 bucket
 * @param {number} params.expiresInSeconds - URL expiration time in seconds (default: 900)
 * @returns {Promise} Signed URL response
 */
export const getSignedCloudFrontUrlApi = async ({ accountTypeId, path, expiresInSeconds = 900 }) => {
  const response = await userAxios.post(
    '/business_website/class_room/ media/signed_url',
    {
      accountTypeId,
      path,
      expiresInSeconds
    },
    { withCredentials: true }
  );
  return response.data;
};



export const thumbnailApi = {
  // Generate or upload thumbnail
  generateOrUploadThumbnail: async (formData) => {
    const response = await userAxios.post(
      '/business_website/class_room/provider/thumbnail',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
      }
    );
    return response.data;
  },

  // Generate thumbnail from segment
  generateSegmentThumbnail: async (data) => {
    const response = await userAxios.post(
      '/business_website/class_room/provider/thumbnail',
      data,
      { withCredentials: true }
    );
    return response.data;
  },

  // Delete thumbnail
  deleteThumbnail: async (data) => {
    const response = await userAxios.delete(
      '/business_website/class_room/provider/thumbnail',
      { 
        data,
        withCredentials: true 
      }
    );
    return response.data;
  },

  // Set primary thumbnail
  setPrimaryThumbnail: async (data) => {
    const response = await userAxios.put(
      '/business_website/class_room/provider/thumbnail/primary',
      data,
      { withCredentials: true }
    );
    return response.data;
  }
};