import userAxios from "@/lib/axios/axios";

export const getWebsiteTemplatesApi = async () => {
  const response = await userAxios.get(
    `/business_website/template/get_website_templates`
  );
  return response.data; // pages count
};

export const getWebsiteSpecificTemplateApi = async (params) => {
  const response = await userAxios.get(
    `/business_website/template/get_website_specific_template`,
    { params }
  );
  return response.data;
};

export const getWebTemplatePageDetailsApi = async (params) => {
  const response = await userAxios.get(
    `/business_website/template/get_web_template_page_details`,
    { params }
  );
  return response.data;
}

export const setupWebsiteTemplateApi = async (values) => {
  const response = await userAxios.post(
    `/business_website/template/setup_website_template`,
    values
  );
  return response.data;
}

export const getWebsiteTemplateSettingsApi = async (params) => {
  const response = await userAxios.get(
    `/business_website/template/get_website_template_settings`,
    { params }
  );
  return response.data;
}

export const updateWebsiteTemplateSettingsApi = async (data) => {
  const response = await userAxios.post(
    `/business_website/template/update_website_template_settings`,
    data
  );
  return response.data;
}

export const publishWebsiteTemplateApi = async (data) => {
  const response = await userAxios.post(
    `/business_website/template/publish_website_template`,
    data
  );
  return response.data;
}

export const checkSubdomainAvailabilityApi = async (subdomain) => {
  const response = await userAxios.get(
    `/business_website/template/check_subdomain_availability?subdomain=${subdomain}`
  );
  return response.data;
}

export const updateWebsiteTemplateSettingsFixedSectionsApi = async (data) => {
  const response = await userAxios.post(
    `/business_website/template/update_website_template_settings_fixed_sections`,
    data
  );
  return response.data;
}

export const addDomainInTemplateApi = async (data) => {
  const response = await userAxios.post(
    `/business_website/domain_management/add_domain`,
    data
  );
  return response.data;
}

export const checkDomainVerificationApi = async (data) => {
  const response = await userAxios.post(
    `/business_website/domain_management/check_domain_verified`,
    data
  );
  return response.data;
}

export const deleteTemplateDomainApi = async (data) => {
  const response = await userAxios.post(
    `/business_website/domain_management/delete_domain`,
    data
  );
  return response.data;
}

export const resetWebsiteDomainGithubProjectApi = async (data) => {
  const response = await userAxios.post(
    `/business_website/domain_management/reset_website_domain_github_project`,
    data
  );
  return response.data;
}

// github domain management
export const githubRepoWebsiteAddDomainApi = async (data) => {
  const response = await userAxios.post(
    `/business_website/domain_management/add_domain_for_github_repo_website`,
    data
  );
  return response.data;
}

export const githubRepoWebsiteCheckDomainVerificationApi = async (data) => {
  const response = await userAxios.post(
    `/business_website/domain_management/github_repo_website_check_domain_verified`,
    data
  );
  return response.data;
}

export const setupGithubRepoWebsiteTemplateApi = async (values) => {
  const response = await userAxios.post(
    `/business_website/template/setup_github_repo_website_template`,
    values
  );
  return response.data;
}