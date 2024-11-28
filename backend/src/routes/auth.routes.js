const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authenticate } = require('../middleware/auth');
const { validateLoginRequest } = require('../middleware/validate');

router.post('/login', validateLoginRequest, authController.login);
router.get('/validate', authenticate, authController.validateToken);

module.exports = router;