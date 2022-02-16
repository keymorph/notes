import jwt from 'jsonwebtoken'
import connection from '../models/database.js'

const authenticateToken = (req, res, next) => {
  const token = req.headers['auth-token']

  if (token == null) {
    return res.status(403).json({ error: 'Session Token not found.' })
  }

  jwt.verify(token, process.env.AUTH_TOKEN_SECRET, (err, userID) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid Session Token.' })
    }

    connection.query(
      `SELECT * FROM users WHERE userID = '${userID}';`,

      async (err, results) => {
        if (results.length == 0) {
          return res.status(403).json({ error: 'User not found.' })
        }

        req.userID = userID
        console.log(req.userID)

        // res.locals.userID = userID;
        // console.log(res.locals.userID)

        next()
      })
  })
}

export default authenticateToken