
 const validacionSchema = (schema) => async (req, res, next) => {
  try {
    await schema.parse(req.body)
    next()
  } catch (error) {
    console.log(error.errors)
    
    if (Array.isArray(error.errors)) {
      return res.status(400).json(
        error.errors.map((error) => error.message))
    };
    return res.status(400).json(error.message)
  };
  
};

module.exports = {  
  validacionSchema
}