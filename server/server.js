import Express from 'express';
import dotenv from 'dotenv';
import bodyparser from 'body-parser';

import users from './routes/user.routes';
import trips from './routes/trip.routes';
import bookings from './routes/booking.routes';

dotenv.config();
const app = new Express();
app.get('/', (req, res) => {
  res.json({ success: true });
});
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use('/', users);
app.use('/api', trips);
app.use('/api', bookings);

app.listen(process.env.PORT, () => {
  console.log(`Running on port ${process.env.PORT}`);
});
export default app;
