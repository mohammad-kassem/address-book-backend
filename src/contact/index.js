const { Router } = require('express');
const { add, get, update } = require('./controller');
const router = Router();

router.post('/add', add);
router.get('/', get);
router.get('/update', update);



module.exports = router; 