const { Router } = require('express');
const { agregarClient,getClient } = require('../controllers/faceController');
const router = Router();
router.post('/agregarClient', agregarClient)
router.get('/getClient', getClient)


module.exports = router;