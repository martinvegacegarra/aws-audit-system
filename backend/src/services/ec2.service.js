const {
  DescribeInstancesCommand,
  DescribeImagesCommand,
  DescribeVolumesCommand,
  DescribeSnapshotsCommand,
  DescribeVpcsCommand,
  DescribeSubnetsCommand,
  DescribeSecurityGroupsCommand,
  DescribeNetworkAclsCommand,
} = require('@aws-sdk/client-ec2');
const awsService = require('./aws.service');
const logger = require('../utils/logger');

class EC2Service {
  constructor() {
    this.client = awsService.clients.ec2;
  }

  async getAllInstances() {
    return awsService.getFromCacheOrFetch('ec2-instances', async () => {
      const command = new DescribeInstancesCommand({});
      const response = await this.client.send(command);
      return response.Reservations.flatMap(r => r.Instances);
    });
  }

  async getAllImages() {
    return awsService.getFromCacheOrFetch('ec2-images', async () => {
      const command = new DescribeImagesCommand({
        Owners: ['self'],
      });
      const response = await this.client.send(command);
      return response.Images;
    });
  }

  async getAllVolumes() {
    return awsService.getFromCacheOrFetch('ec2-volumes', async () => {
      const command = new DescribeVolumesCommand({});
      const response = await this.client.send(command);
      return response.Volumes;
    });
  }

  async getAllSnapshots() {
    return awsService.getFromCacheOrFetch('ec2-snapshots', async () => {
      const command = new DescribeSnapshotsCommand({
        OwnerIds: ['self'],
      });
      const response = await this.client.send(command);
      return response.Snapshots;
    });
  }

  async getAllVpcs() {
    return awsService.getFromCacheOrFetch('ec2-vpcs', async () => {
      const command = new DescribeVpcsCommand({});
      const response = await this.client.send(command);
      return response.Vpcs;
    });
  }

  async getAllSubnets() {
    return awsService.getFromCacheOrFetch('ec2-subnets', async () => {
      const command = new DescribeSubnetsCommand({});
      const response = await this.client.send(command);
      return response.Subnets;
    });
  }

  async getAllSecurityGroups() {
    return awsService.getFromCacheOrFetch('ec2-security-groups', async () => {
      const command = new DescribeSecurityGroupsCommand({});
      const response = await this.client.send(command);
      return response.SecurityGroups;
    });
  }

  async getAllNetworkAcls() {
    return awsService.getFromCacheOrFetch('ec2-network-acls', async () => {
      const command = new DescribeNetworkAclsCommand({});
      const response = await this.client.send(command);
      return response.NetworkAcls;
    });
  }

  async getFullInventory() {
    try {
      const [
        instances,
        images,
        volumes,
        snapshots,
        vpcs,
        subnets,
        securityGroups,
        networkAcls,
      ] = await Promise.all([
        this.getAllInstances(),
        this.getAllImages(),
        this.getAllVolumes(),
        this.getAllSnapshots(),
        this.getAllVpcs(),
        this.getAllSubnets(),
        this.getAllSecurityGroups(),
        this.getAllNetworkAcls(),
      ]);

      return {
        instances,
        images,
        volumes,
        snapshots,
        vpcs,
        subnets,
        securityGroups,
        networkAcls,
      };
    } catch (error) {
      logger.error('Error getting EC2 inventory:', error);
      throw error;
    }
  }
}

module.exports = new EC2Service();