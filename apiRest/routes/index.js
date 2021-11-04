const { Router } = require('express');
const { createorden,getingreso2,addOrden,getingreso,getingresoById,createFile } = require('../controllers/index.controller');
const router = Router();

//const { getingreso2,readFile,addOrden,getingreso,getingresoById,createFile} = require('./');


//routes
router.post('/add', addOrden);
router.get('/ingreso/:numerordenexamen', getingresoById);
router.get('/ingreso', getingreso);
router.post('/createfile', createFile);
//router.get('/leerarchivo', readFile);
router.get('./ingreso2', getingreso2);
router.post('/createOrden', createorden);
//soap




module.exports = router;