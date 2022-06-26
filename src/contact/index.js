const { Router } = require('express');
const { add, get, update, remove } = require('./controller');
const router = Router();



router.post('/add', add);
router.get('/', get);
router.put('/update', update);
router.delete('/remove', remove);




module.exports = router; 