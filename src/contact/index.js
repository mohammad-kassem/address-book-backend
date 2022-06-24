const { Router } = require('express');
const { add, get } = require('./controller');
const router = Router();

router.post('/add', add);
router.get('/', get);



module.exports = router; 