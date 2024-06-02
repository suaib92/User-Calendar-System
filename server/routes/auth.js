const express = require('express');
const { authGoogle, authGoogleCallback } = require('../controllers/authController');

const router = express.Router();

router.get('/google', authGoogle);
router.get('/google/callback', authGoogleCallback);

module.exports = router;
