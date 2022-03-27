import jwt from 'jsonwebtoken'
import { users } from '../models/database.js'

const authenticateToken = (req, res, next) => {
  const token = req.headers['auth-token'];

  if (token == null) {
    return res.status(403).json({ error: 'Session Token not found.' });
  }

  jwt.verify(token, process.env.AUTH_TOKEN_SECRET, (err, jwt) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid Session Token.' });
    }

    users.item(jwt.userID, jwt.userID).read().then(({ resource }) => {
        if (!resource) {
          console.log('User not found.');
          return res.status(403).json({ error: 'User not found.' });
        }
       
        req.body.userID = jwt.userID;
        next();
    }).catch((error) => {
        console.log(error);
        return res.status(500).json({ error: 'Database error while verifying the JWT Token.' });
    });
  })
}

export default authenticateToken
