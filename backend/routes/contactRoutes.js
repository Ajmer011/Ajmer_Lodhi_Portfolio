const express = require('express');
const router = express.Router();
const { sendContact } = require('../controllers/contactControllers');

router.post('/', sendContact);

module.exports = router;
