const asyncHandler = require('express-async-handler');
const ec2Service = require('../services/ec2.service');
const logger = require('../utils/logger');
const { successResponse } = require('../utils/response');

const getEC2Inventory = asyncHandler(async (req, res) => {
  const inventory = await ec2Service.getFullInventory();
  return successResponse(res, inventory);
});

const getInstances = asyncHandler(async (req, res) => {
  const instances = await ec2Service.getAllInstances();
  return successResponse(res, instances);
});

const getImages = asyncHandler(async (req, res) => {
  const images = await ec2Service.getAllImages();
  return successResponse(res, images);
});

const getVolumes = asyncHandler(async (req, res) => {
  const volumes = await ec2Service.getAllVolumes();
  return successResponse(res, volumes);
});

const getSnapshots = asyncHandler(async (req, res) => {
  const snapshots = await ec2Service.getAllSnapshots();
  return successResponse(res, snapshots);
});

const getVpcs = asyncHandler(async (req, res) => {
  const vpcs = await ec2Service.getAllVpcs();
  return successResponse(res, vpcs);
});

const getSubnets = asyncHandler(async (req, res) => {
  const subnets = await ec2Service.getAllSubnets();
  return successResponse(res, subnets);
});

const getSecurityGroups = asyncHandler(async (req, res) => {
  const securityGroups = await ec2Service.getAllSecurityGroups();
  return successResponse(res, securityGroups);
});

const getNetworkAcls = asyncHandler(async (req, res) => {
  const networkAcls = await ec2Service.getAllNetworkAcls();
  return successResponse(res, networkAcls);
});

module.exports = {
  getEC2Inventory,
  getInstances,
  getImages,
  getVolumes,
  getSnapshots,
  getVpcs,
  getSubnets,
  getSecurityGroups,
  getNetworkAcls,
};