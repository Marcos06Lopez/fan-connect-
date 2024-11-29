const express = require('express');
const { getMessagesByForum, createMessage } = require('../controllers/messageController');
const router = express.Router();

router.get('/:forum_id', getMessagesByForum);
router.post('/', createMessage);

module.exports = router;
