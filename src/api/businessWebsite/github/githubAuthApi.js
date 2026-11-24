import userAxios from "@/lib/axios/axios";

export const getGithubAuthApi = async (params) => {
    const response = await userAxios.get(`/github/auth/get_github_auth`, {params}); 
    return response.data; 
}

export const getGithubAuthUrlApi = async (params) => {
    const response = await userAxios.get(`/github/auth/get_github_auth_url`, {params}); 
    return response.data;
}

export const deployGithubProjectToVercelApi = async (data) => {
    const response = await userAxios.post(`/github/deploy_github_project_to_vercel`, data); 
    return response.data;
}

export const checkDeploymentStatusApi = async (data) => {
    const response = await userAxios.post(`/github/check_deployment_status`, data); 
    return response.data;
}

export const getDeploymentLogsApi = async (data) => {
    const response = await userAxios.post(`/github/get_deployment_logs`, data); 
    return response.data;
}

export const getWebsiteDeploymentsApi = async (data) => {
    const response = await userAxios.post(`/github/get_website_deployments`, data); 
    return response.data;
}

export const deleteGithubProjectFromVercelApi = async (data) => {
    const response = await userAxios.post(`/github/delete_github_project_from_vercel`, data); 
    return response.data;
}

export const getAccessibleReposApi = async (params) => {
    const response = await userAxios.get(`/github/get_accessible_repos`, { params }); 
    return response.data;
}

export const getInstallationStatusApi = async (params) => {
    const response = await userAxios.get(`/github/get_installation_status`, { params }); 
    return response.data;
}