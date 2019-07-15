import uuidv4 from 'uuidv4';
import moment from 'moment';
import * as db from '../db/db';

const Trip = {
  async createTrip(req, res) {
    const createTripQuery = `INSERT INTO
                                trip(id, user_id, bus_id, origin, destination,trip_date, fare, status)
                                values($1, $2, $3, $4, $5, $6, $7, $8)
                                returning *
                                `;
    const values = [
      uuidv4(),
      req.body.user_id,
      req.body.bus_id,
      req.body.origin,
      req.body.destination,
      moment(new Date()),
      req.body.fare,
      req.body.status,
    ];
    const userQuery = 'SELECT * FROM user WHERE id = $1';
    try {
      const { rows } = await db.pool.query(createTripQuery, values);
      const user = await db.pool.query(userQuery, [req.body.user_id]).rows;
      db.pool.end();
      return res.json({
        status: 'Success',
        data: {
          rows,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
        },
      });
    } catch (err) {
      return res.status(400).send({ message: err });
    }
  },
  async getTrips(req, res) {
    const getTripQuery = 'SELECT * FROM trip WHERE id = $1';
    try {
      const trips = [];
      const { rows } = await db.pool.query(getTripQuery, [req.body.user_id]);
      await db.pool.end();
      rows.forEach((row) => {
        trips.push(row);
      });
      return res.json({
        status: 'Success',
        data: trips,
      });
    } catch (err) {
      return res.status(400).send({ message: err });
    }
  },
  async cancelTrip(req, res) {
    const cancelTripQuery = `UPDATE trip
                              set status = 'cancelled'
                              WHERE id = $1
                            `;
    try {
      await db.pool.query(cancelTripQuery, [req.params.id]);
      await db.pool.end();
    } catch (err) {
      return res.status(400).send({ message: err });
    }
    return res.json({
      status: 'Success',
      data: {
        message: 'Trip cancelled successsfully',
      },
    });
  },
};
export default Trip;
