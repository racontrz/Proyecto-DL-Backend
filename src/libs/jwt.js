const jwt = require('jsonwebtoken');

const createAccessToken = ( payload ) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      'xyz123',
      { expiresIn: '1h' },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
        }
    );
  });
};

module.exports = {
  createAccessToken
}