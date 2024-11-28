const express = require('express');
const router = express.Router();
const ec2Controller = require('../controllers/ec2.controller');
const { authenticate } = require('../middleware/auth');

// EC2 Routes
router.get('/ec2', authenticate, ec2Controller.getEC2Inventory);
router.get('/ec2/instances', authenticate, ec2Controller.getInstances);
router.get('/ec2/images', authenticate, ec2Controller.getImages);
router.get('/ec2/volumes', authenticate, ec2Controller.getVolumes);
router.get('/ec2/snapshots', authenticate, ec2Controller.getSnapshots);
router.get('/ec2/vpcs', authenticate, ec2Controller.getVpcs);
router.get('/ec2/subnets', authenticate, ec2Controller.getSubnets);
router.get('/ec2/security-groups', authenticate, ec2Controller.getSecurityGroups);
router.get('/ec2/network-acls', authenticate, ec2Controller.getNetworkAcls);

module.exports = router;