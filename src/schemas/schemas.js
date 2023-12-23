const { z } = require ('zod');

 const crearProductoSchema = z.object({
  name: z.string({
    required_error: 'El nombre es requerido',
    invalid_type_error: 'El nombre debe ser un string',
  }).min(1).max(50),
  brand: z.string({
    required_error: 'La marca es requerida',
    invalid_type_error: 'La marca debe ser un string',
  }).min(1).max(50),
  description: z.string({
    required_error: 'La descripción es requerida',
    invalid_type_error: 'La descripción debe ser un string',
  }).min(1).max(500),
  image: z.string({
    required_error: 'La imagen es requerida',
    invalid_type_error: 'La imagen debe ser un string',
  }).min(1).max(500),
  price: z.string({
    required_error: 'El precio es requerido',
    invalid_type_error: 'El precio debe ser un number',
  }),

});

const editarProductoSchema = z.object({
  name: z.string({
    required_error: 'El nombre es requerido',
    invalid_type_error: 'El nombre debe ser un string',
  }).min(1).max(50).optional(),
  brand: z.string({
    required_error: 'La marca es requerida',
    invalid_type_error: 'La marca debe ser un string',
  }).min(1).max(50).optional(),
  description: z.string({
    required_error: 'La descripción es requerida',
    invalid_type_error: 'La descripción debe ser un string',
  }).min(1).max(500).optional(),
  image: z.string({
    required_error: 'La imagen es requerida',
    invalid_type_error: 'La imagen debe ser un string',
  }).min(1).max(500).optional(),
  price: z.number({
    required_error: 'El precio es requerido',
    invalid_type_error: 'El precio debe ser un number',
  }).optional(),

});

module.exports = {
  crearProductoSchema,
  editarProductoSchema
}