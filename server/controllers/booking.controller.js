import uuidv4 from 'uuidv4';
import moment from 'moment';
import db from '../db/db';

const Booking = {
  async createBooking(req, res) {
    const createBookingQuery = `INSERT INTO
                                        booking(id,user_id, trip_id, seat_number, created_on)
                                        values($1, $2, $3, $4, $5)
                                        returning *
                                        `;
    const userQuery = 'SELECT * FROM user WHERE user_id = $1';
    const tripQuery = 'SELECT * FROM trip WHERE id = $1';
    const values = [
      uuidv4(),
      req.body.user_id,
      req.body.trip_id,
      req.body.seat_number,
      moment(new Date()),
    ];
    try {
      const { rows } = await db.pool.query(createBookingQuery, values);
      const user = await db.pool.query(userQuery, [req.body.user_id]).rows;
      const trip = await db.pool.query(tripQuery, [req.body.trip_id]).rows;
      await db.pool.end();
      return res.json({
        status: 'Success',
        data: {
          booking_id: rows[0].id,
          user_id: req.body.user_id,
          trip_id: req.body.trip_id,
          bus_id: trip.bus_id,
          trip_date: trip.trip_date,
          seat_number: req.body.seat_number,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
        },
      });
    } catch (err) {
      return res.status(400).send({ message: err });
    }
  },
  async getBooking(req, res) { //eslint-disable-line
    const getOneBookingQuery = 'SELECT * FROM booking where id = $1';
    const getAll = 'SELECT * FROM booking';
    try {
      const bookings = [];
      if (req.user.isAdmin === 'True') {
        const { rows } = await db.pool.query(getAll);
        await db.pool.end();
        rows.forEach((row) => {
          bookings.push(row);
        });
        res.json({
          status: 'Success',
          data: bookings,
        });
      } else {
        const { rows } = await db.pool.query(getOneBookingQuery, [req.user.id]);
        return res.json({
          status: 'Success',
          data: rows,
        });
      }
    } catch (err) {
      return res.status(400).send({ message: err });
    }
  },
  async deleteBooking(req, res) {
    const deleteBookingQuery = 'DELETE from booking where id = $1 returning *';
    try {
      const { rows } = await db.pool.query(deleteBookingQuery, [req.params.id]);
      await db.pool.end();
      return res.json({
        status: 'Success',
        data: rows[0],
      });
    } catch (err) {
      return res.status(400).send({ message: err });
    }
  },
};

export default Booking;
