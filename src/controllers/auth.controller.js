const pool = require('../db.js');
const bcrypt = require('bcrypt');
const { createAccessToken } = require('../libs/jwt.js');


const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1', [email]
      )
  
      if (result.rows.length === 0) {
        return res.status(401).json({
          message: 'Correo no esta registrado'
        })            
      }
    
    const validPassword = await bcrypt.compare(password, result.rows[0].password);
      
      if(!validPassword) {
        return res.status(401).json({
          message: 'Contraseña incorrecta'
        })
      }
    const token = await createAccessToken({ id: result.rows[0].id  });
  
    res.cookie('token', token, {
      // httpOnly: true,
      sameSite: 'none',
      secure: true,
    })       
  
    return res.json(result.rows[0]);
  } catch (error) {
    console.log(error.message)
  }
}

const registroUser = async (req, res, next) => {
  const { username, email, password} = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users ( username, email, password) VALUES ($1, $2, $3) RETURNING *',[
        username, 
        email, 
        hashedPassword
     ]
    ); 
  
    const token = await createAccessToken({ id: result.rows[0].id });

    res.cookie('token', token, {
      // httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7
    });       

    return res.json(result.rows[0]);

    // return res.json({
    //   token : token
    // })

  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({
        message: 'El correo ya se encuentra registrado'
      })
    }
    next(error);
  };
};

const exitUser = async (req, res) => {
  try {
    res.clearCookie('token');
  res.sendStatus(200);
  } catch (error) {
    console.log(error.message)
  }
};

const perfilUser = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [req.userId]);
    const token = await createAccessToken({ id: result.rows[0].id });

    res.cookie('token', token, {
      // httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7
    });   
    
    return res.json(result.rows[0]);
    
    
  } catch (error) {
   console.log(error.message) 
  }
}

module.exports = {
  loginUser,
  registroUser,
  exitUser,
  perfilUser
} 