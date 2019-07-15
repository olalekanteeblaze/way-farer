import Express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import user from './routes/user.routes';
import trip from './routes/trip.routes';
import booking from './routes/booking.routes';

dotenv.config();

const app = new Express();

app.use(bodyParser.json());
app.use(bodyParser({ extended: false }));
app.get('/', (req, res) => {
  res.send({ status: 'Success' });
});

app.use('/', user);
app.use('/api/v1/', trip);
app.use('/api/v1/', booking);

app.listen(process.env.PORT, () => {
  console.log(`app running on port ${process.env.PORT}`);
});

export default app;
