const { Router } = require('express');
const router = Router();
const { getAllProductos, getIdProductos, postProductos, putProductos, deleteProductos, getMyProductos } = require('../controllers/controller.js');
const { isAuth } = require('../middlewares/auth.middleware.js');
const { validacionSchema } = require('../middlewares/validacion.middleware.js');
const { crearProductoSchema, editarProductoSchema } = require( '../schemas/schemas.js');

router.get('/productos', getAllProductos);

router.get('/misproductos', isAuth, getMyProductos);

router.get('/productos/:id', isAuth, getIdProductos);

router.post('/productos', isAuth, validacionSchema(crearProductoSchema ), postProductos);

router.put('/misproductos/:id',isAuth, validacionSchema(editarProductoSchema ), putProductos);

router.delete('/productos/:id', isAuth, deleteProductos);


module.exports = router;




