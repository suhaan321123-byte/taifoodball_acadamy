// get student course 
import studentAxios from "@/lib/axios/studentAxios";

export const getStudentCoursesApi = async (params) =>{
    const response = await studentAxios.get(`/business_website/student/get_student_courses`, { params }); 
    return response.data;
}
export const getStudentAttendanceApi = async (params) =>{
    const response = await studentAxios.get(`/business_website/student/get_student_attendance`, { params }); 
    return response.data;
}

export const getStudentFeeCollectionsApi = async (params) =>{
    const response = await studentAxios.get(`/business_website/student/get_student_fee_collections`, { params }); 
    return response.data;
}

export const createCourseProviderSubscriptionPaymentSessionApi = async (data) => {
  const response = await studentAxios.post(`/business_website/student/create_subscription_payment_session`,data);
  return response.data;
};

export const getStudentBranchesApi = async (params) =>{
    const response = await studentAxios.get(`/business_website/student/get_institute_branches`, { params }); 
    return response.data;
}

export const getStudentCertificatesApi = async (params) =>{
    const response = await studentAxios.get(`/business_website/student/get_student_certificates`, { params }); 
    return response.data;
}

export const getStudentAuthDataApi = async (data) =>{
    const response = await studentAxios.post(`/business_website/student/get_student_auth_data`, data); 
    return response.data;
}