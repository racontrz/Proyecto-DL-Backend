
const pool = require('../db.js');


const getAllProductos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (error) {
    console.log(error.message);
  };
};

const getMyProductos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products WHERE create_by = $1', [req.userId]);
    res.json(result.rows);
  } catch (error) {
    console.log(error.message);
  };
};

const getIdProductos = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM products WHERE product_id = $1', [id]);

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    console.log(error.message);
  }
};
const postProductos = async (req, res, next) => {
  const { name, brand, description, image, price} = req.body;


  try {
    const result = await pool.query(
      'INSERT INTO products (name, brand, description, image, price, create_by) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',[
        name, 
        brand, 
        description, 
        image, 
        price, 
        req.userId
      ]
    );
  
    res.send(result.rows[0]);
  } catch (error) {
    console.log(error.message);
  };
  
};

const putProductos = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, brand, description, image, price } = req.body;

    const result = await pool.query(
      'UPDATE products SET name = $1, brand = $2, description = $3, image = $4, price = $5 WHERE id = $6 RETURNING *', [
        name,
        brand,
        description,
        image,
        price,
        id
      ]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ message: 'Producto no encontrado' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.log(error.message);
    
  }
};


const deleteProductos = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM products WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      res.status(404).json({ message: 'Producto no encontrado' });
    } else {
      res.sendStatus(204);
    }

  } catch (error) {
    console.log(error.message);
  }
};


module.exports = {
  getAllProductos,
  getMyProductos,
  getIdProductos,
  postProductos,
  putProductos,
  deleteProductos
  
}