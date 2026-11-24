// import customerAxios from "@/lib/axios/axios";
// import customerAxios from "@/lib/axios/customerAxios";
import { refreshAxios } from "../../lib/axios/refreshAxios";
import customerAxios from "../../lib/axios/customerAxios";
// import { refreshAxios } from "@/lib/axios/refreshAxios";
// import { snackbarBus } from "@/utils/snackbarBus";
export const signupApi = async (data) => {
  // agencyName: "",
  // location: "",
  // phoneNumber: "",
  // fullName: "",
  // email: "",
  // password: "",
  const response = await customerAxios.post("/signup", data);
  return response.data; // message
};

export const signupOtpVerificationApi = async (data) => {
  const response = await customerAxios.post("/signup_otp_verification", data);
  return response.data; // message ="OTP verified" userData
};

export const loginApi = async (data) => {
  const response = await customerAxios.post("/login", data);
  return response.data; // message = "success" userData
};

export const refreshAccessTokenApi = (sessionType = "user") => {
  return new Promise((resolve, reject) => {
    refreshAxios
      .post(
        "/auth/user_reauth",
        {},
        {
          headers: { "X-Session-Type": sessionType },
        },
      )
      .then((response) => {
        if (response.status !== 200 || !response.data.accessToken) {
          const error = new Error("Refresh token invalid");
          error.response = response;
          reject(error);
        } else {
          resolve(response.data);
        }
      })
      .catch((error) => {
        // snackbarBus.emit(error.response.data.message, "error");

        console.error("Failed to refresh token:", error.response);
        reject(error);
      });
  });
};

export const forgotPasswordGenarateOtpApi = async (data) => {
  const response = await customerAxios.post("/forgot_password/generate_otp", data);
  return response.data; // message = "Genareted phone number Otp"
};

export const forgotPasswordOtpVerificationApi = async (data) => {
  const response = await customerAxios.post("/forgot_password/otp_verification", data);
  return response.data; // message , userData
};

export const forgotResetPasswordApi = async (data) => {
  const response = await customerAxios.post("/forgot_password/reset_password", data);
  return response.data; // message ,
};

export const resendOtpApi = async (phone) => {
  const response = await customerAxios.get(`/resend_otp/${phone}`);
  return response.data; // message ,
};

export const userLogoutApi = async (data) => {
  const response = await customerAxios.post("/logout", data);
  return response.data; // message ,
};

export async function sendWebsiteEmailOtp(params) {
  const response = await customerAxios.post("/auth/email/website/student/send_otp", {
    email: params.email,
    origin: params.origin,
    returnTo: params.returnTo,
    subdomain: params.subdomain,
  });
  return response.data;
}

export async function verifyWebsiteEmailOtp(params) {
  const response = await customerAxios.post("/auth/email/website/student/verify_otp", {
    email: params.email,
    otp: params.otp,
    origin: params.origin,
    returnTo: params.returnTo,
    subdomain: params.subdomain,
  });
  return response.data;
}
