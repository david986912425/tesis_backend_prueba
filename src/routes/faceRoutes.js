const { Router } = require('express');
const { agregarClient,getClient,addreport,getreport } = require('../controllers/faceController');
const router = Router();
router.post('/agregarClient', agregarClient)
router.get('/getClient', getClient)
router.post('/addreport', addreport)
router.get('/getreport', getreport)


module.exports = router;