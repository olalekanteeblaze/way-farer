import uuidv4 from 'uuidv4';
import moment from 'moment';
import * as db from '../db/db';
import Helper from './helper.controller';

const User = {
  async createUser(req, res) { //eslint-disable-line
    const hashPassword = Helper.hashPassword(req.body.password);
    const createUserQuery = `INSERT INTO
                            user(id, email, password, first_name, last_name, created_at, is_admin)
                            values($1, $2, $3, $4, $5, $6, $7)
                            returning *
                          `;
    const values = [
      uuidv4(),
      req.body.email,
      hashPassword,
      req.body.first_name,
      req.body.last_name,
      moment(new Date()),
      req.body.is_admin,
    ];
    try {
      await db.pool.query(createUserQuery, values);
      return res.json({
        status: 'Success',
        data: {
          user_id: req.body.id,
          password: hashPassword,
          is_admin: req.body.is_admin,
        },
      });
    } catch (err) {
      if (err === '_bt_check_unique') {
        return res.status(400).send({ message: `Account with ${req.body.email} already exists` });
      }
      return res.status(404).send({ message: err });
    }
  },
  async loginUser(req, res) {
    const loginQuery = 'SELECT * FROM user WHERE EMAIL = $1';
    try {
      const { rows } = await db.query(loginQuery, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).send({ err: 'Invalid credentials' });
      }
      if (!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).send({ err: 'Wrong password' });
      }
      const token = Helper.generateToken(rows[0].id);
      return res.json({
        status: 'Success',
        data: {
          user_id: rows[0].id,
          is_admin: rows[0].isAdmin,
          token,
          first_name: rows[0].first_name,
          last_name: rows[0].last_name,
        },
      });
    } catch (err) {
      return res.status(400).send({ err });
    }
  },
};

export default User;
