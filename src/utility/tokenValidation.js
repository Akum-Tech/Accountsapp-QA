import jwt from 'jsonwebtoken';



export const checkToken = async(req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token) {
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }
    jwt.verify(token, 'AccountingApi', async (err, decoded) => {
      if (err) {
        return res.json({
            statusCode:500,
            success: false,
            message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        // console.log(req.decoded.data);
       next();
      }
    });
  } else {
    return res.json({
        statusCode:500,
        success: false,
        message: 'Auth token is not supplied'
    });
  }
};