// services/api/awsIntegrationApi.js

import userAxios from "@/lib/axios/axios";

/**
 * Create a new AWS Integration
 * @param {Object} integrationData - AWS integration configuration
 * @param {string} integrationData.accountTypeId - Account type identifier
 * @param {string} integrationData.accountName - Descriptive name for the integration
 * @param {string} integrationData.awsAccountId - 12-digit AWS account number
 * @param {string} integrationData.iamRoleArn - IAM Role ARN
 * @param {string} integrationData.region - AWS region
 * @param {string} integrationData.s3Bucket - S3 bucket name
 * @param {string} integrationData.mediaConvertEndpoint - MediaConvert endpoint URL
 * @param {string} integrationData.cloudFrontDomain - CloudFront domain (optional)
 * @returns {Promise} API response
 */
export const createAwsIntegrationApi = async (integrationData) => {
  const response = await userAxios.post(
    '/provider/aws_integration/create',
    integrationData
  );
  return response.data;
};

/**
 * Generate AWS policies and S3 configurations
 * @param {Object} configData - Configuration data for policy generation
 * @param {string} configData.awsAccountId - AWS account ID
 * @param {string} configData.s3Bucket - S3 bucket name
 * @param {string} configData.externalId - External ID for trust policy
 * @param {string} configData.region - AWS region
 * @returns {Promise} Generated policies and configurations
 */
export const generateAwsPolicyAndS3ConfigsApi = async (configData) => {
  const response = await userAxios.post(
    '/provider/aws_integration/policies/generate',
    configData // This should be an object like { accountTypeId: "123" }
  );
  return response.data;
};

/**
 * Verify AWS integration setup
 * @param {Object} verificationData - Data for verification
 * @param {string} verificationData.integrationId - Integration ID to verify
 * @param {string} verificationData.iamRoleArn - IAM Role ARN to test
 * @param {string} verificationData.externalId - External ID for role assumption
 * @param {string} verificationData.region - AWS region
 * @param {string} verificationData.s3Bucket - S3 bucket to test access
 * @returns {Promise} Verification results
 */
export const verifyAwsIntegrationSetupApi = async (verificationData) => {
  const response = await userAxios.post(
    '/provider/aws_integration/verify',
    verificationData
  );
  return response.data;
};

/**
 * Get all AWS integrations for the current user
 * @returns {Promise} List of AWS integrations
 */
export const getAwsIntegrationsApi = async ( accountTypeId) => {
  const response = await userAxios.get(`/provider/aws_integration/get/${accountTypeId}`);
  return response.data;
};


/**
 * Get specific AWS integration by ID
 * @param {string} integrationId - Integration ID
 * @returns {Promise} AWS integration details
 */
export const getAwsIntegrationByIdApi = async (integrationId) => {
  const response = await userAxios.get(`/provider/aws_integration/${integrationId}`);
  return response.data;
};

/**
 * Delete AWS integration
 * @param {string} integrationId - Integration ID to delete
 * @returns {Promise} Delete operation result
 */
export const deleteAwsIntegrationApi = async (integrationId) => {
  const response = await userAxios.delete(`/provider/aws_integration/${integrationId}`);
  return response.data;
};



/**
 * Create CloudFront Key Pair for signed URLs
 * @returns {Promise} Generated key pair (publicKey, privateKey, keyPairId)
 */
export const createCloudFrontKeyPairApi = async () => {
  const response = await userAxios.post('/provider/aws_integration/create_key_pair');
  return response.data;
};

/**
 * Update streaming configuration with CloudFront details
 * @param {Object} streamingData - Streaming configuration data
 * @param {string} streamingData.integrationId - Integration ID
 * @param {string} streamingData.cloudFrontDomain - CloudFront distribution domain
 * @param {string} streamingData.cloudFrontKeyPairId - CloudFront Key Pair ID from AWS
 * @param {string} streamingData.cloudFrontPrivateKeyPem - Private key PEM for signed URLs
 * @returns {Promise} Updated integration details
 */
export const updateStreamingConfigurationApi = async (streamingData) => {
  const response = await userAxios.put(
    '/provider/aws_integration/update_streaming',
    streamingData
  );
  return response.data;
};

/**
 * Verify streaming setup with CloudFront
 * @param {Object} verificationData - Streaming verification data
 * @param {string} verificationData.integrationId - Integration ID
 * @param {string} verificationData.cloudFrontDomain - CloudFront domain to test
 * @param {string} verificationData.cloudFrontKeyPairId - Key Pair ID for signed URL testing
 * @returns {Promise} Streaming verification results
 */
export const verifyStreamingSetupApi = async (verificationData) => {
  const response = await userAxios.post(
    '/provider/aws_integration/verify_streaming',
    verificationData
  );
  return response.data;
};