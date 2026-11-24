// courseNotificationSettingsApi
import userAxios from "@/lib/axios/axios";

export const getCourseNotificationSettingsApi = async (params) => {
    const response = await userAxios.get(
        `/business_website/class_room/provider/get_course_notification_settings`,
        { params }
    );
    return response.data;
};

export const updateCourseNotificationSettingsApi = async (data) => {
    const response = await userAxios.post(
        `/business_website/class_room/provider/update_course_notification_settings`,
        data
    );
    return response.data;
};

export const deleteCourseNotificationSettingsApi = async (data) => {
    const response = await userAxios.post(
        `/business_website/class_room/provider/delete_course_notification_settings`,
        data
    );
    return response.data;
};

export const createCourseNotificationSettingsApi = async (data) => {
    const response = await userAxios.post(
        `/business_website/class_room/provider/create_course_notification_settings`,
        data
    );
    return response.data;
};

export const updateCourseNotificationSettingsStatusApi = async (data) => {
    const response = await userAxios.post(
        `/business_website/class_room/provider/update_course_notification_settings_status`,
        data
    );
    return response.data;
};
