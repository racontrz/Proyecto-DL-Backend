const { Router } = require('express');
const { registroUser, loginUser, exitUser, perfilUser } = require('../controllers/auth.controller');
const { isAuth } = require('../middlewares/auth.middleware');
const router = Router();
const { validacionSchema } = require('../middlewares/validacion.middleware.js');
const { registroSchema, loginSchema } = require( '../schemas/auth.schemas.js');


router.post('/login', validacionSchema( loginSchema ), loginUser );

router.post('/registro', validacionSchema( registroSchema ), registroUser );

router.post('/exit', exitUser);

router.get('/perfil', isAuth, perfilUser);




module.exports = router;