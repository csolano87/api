const { Router } = require('express');
const router = Router();

const { createorden,getingreso,createarchivo} = require('../controllers/index.controller');

//routes
router.post('/add', createorden);
router.get('/ingreso', getingreso);
router.post('/archivo', createarchivo);



module.exports = router;