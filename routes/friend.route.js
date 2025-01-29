const express = require('express');
const { sendFriendRequest, updateFriendRequest } = require('../controllers/friend.controller');
const authenticate = require('../middleware/auth.middleware');

const router = express.Router();

// Friend Routes
router.post('/friends/send', authenticate, sendFriendRequest);
router.post('/friends/update', authenticate, updateFriendRequest);

module.exports = router;
