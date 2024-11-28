const { EC2Client } = require('@aws-sdk/client-ec2');
const { IAMClient } = require('@aws-sdk/client-iam');
const { S3Client } = require('@aws-sdk/client-s3');
const { RDSClient } = require('@aws-sdk/client-rds');
const { LambdaClient } = require('@aws-sdk/client-lambda');
const { CloudWatchClient } = require('@aws-sdk/client-cloudwatch');
const config = require('../config/config');
const logger = require('../utils/logger');

class AWSService {
  constructor() {
    this.config = {
      region: config.aws.region,
      credentials: config.aws.credentials,
    };

    this.clients = {
      ec2: new EC2Client(this.config),
      iam: new IAMClient(this.config),
      s3: new S3Client(this.config),
      rds: new RDSClient(this.config),
      lambda: new LambdaClient(this.config),
      cloudwatch: new CloudWatchClient(this.config),
    };

    this.cache = new Map();
  }

  async getFromCacheOrFetch(key, fetchFn, ttl = config.cache.ttl) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < ttl * 1000) {
      return cached.data;
    }

    try {
      const data = await fetchFn();
      this.cache.set(key, {
        data,
        timestamp: Date.now(),
      });
      return data;
    } catch (error) {
      logger.error(`Error fetching AWS resource: ${error.message}`, {
        service: key,
        error,
      });
      throw error;
    }
  }

  clearCache() {
    this.cache.clear();
  }
}

module.exports = new AWSService();