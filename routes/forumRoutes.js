const express = require('express');
const { getForumsByFandom, createForum } = require('../controllers/forumController');
const router = express.Router();

router.get('/:fandom_id', getForumsByFandom);
router.post('/', createForum);

module.exports = router;
