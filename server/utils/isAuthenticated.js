import jwt from 'jsonwebtoken';
import db from '../db/db';

export default async function verifyToken(req, res, next) { //eslint-disable-line
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(400).send({ message: 'Token is not found or has expired' });
  }
  try {
    const verifiedToken = jwt.verify(token, process.env.SECRET);
    const queryText = 'SELECT * FROM user WHERE id = $1';
    const { rows } = await db.query(queryText, [verifiedToken.userId]);
    if (!rows[0]) {
      return res.status(400).send({ message: 'The token you provided is invalid' });
    }
    req.user = { id: verifiedToken.id };
    next();
  } catch (err) {
    return res.status.send({ err });
  }
}
