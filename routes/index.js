const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const fandomRoutes = require('./fandomRoutes');
const forumRoutes = require('./forumRoutes');
const messageRoutes = require('./messageRoutes');

router.use('/auth', authRoutes);
router.use('/auth/fandoms', fandomRoutes);
router.use('/auth/forums', forumRoutes);
router.use('/auth/messages', messageRoutes);

module.exports = router;
