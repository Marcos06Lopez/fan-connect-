const express = require('express');
const { getFandoms, addFandom } = require('../controllers/fandomController');
const router = express.Router();

router.get('/', getFandoms);
router.post('/', addFandom);

module.exports = router;
