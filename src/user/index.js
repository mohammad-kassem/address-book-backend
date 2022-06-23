const { Router } = require('express');
const register = require('./controller');
const router = Router();

router.post('/register', register);

module.exports = router; 