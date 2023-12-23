const { z } = require ('zod');

const registroSchema = z.object({
  username: z.string({
    required_error: 'El nombre es requerido',
    invalid_type_error: 'El email debe ser un string',
  }).min(1).max(50),
  email: z.string({
    required_error: 'El email es requerido',
    invalid_type_error: 'El email debe ser un string',
  }).email({ message: 'Debe ser un email valido' }),
  password: z.string({
    required_error: 'El password es requerido',
    invalid_type_error: 'La password debe ser un string',
  }).min(6, {
     message: 'la contraseña debe tener al menos 6 caracteres' 
    }).max(500),

});

const loginSchema = z.object({
  email: z.string({
    required_error: 'El email es requerido',
    invalid_type_error: 'El email debe ser un string',
  }).email({ message: 'Debe ser un email valido' }),
  password: z.string({
    required_error: 'El password es requerido',
    invalid_type_error: 'La password debe ser un string',
  }).min(6, {
    message: 'la contraseña debe tener al menos 6 caracteres' 
   }).max(500),


});

module.exports = {
  loginSchema,
  registroSchema
}