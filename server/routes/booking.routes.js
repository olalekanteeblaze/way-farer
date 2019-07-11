import { Router } from 'express';
import Booking from '../controllers/booking.controller';
import isAuthenticated from '../utils/isAuthenticated';

const router = new Router();

router.post('/booking', Booking.createBooking);
router.get('/bookings', isAuthenticated, Booking.getBooking);
router.delete('/bookings/:bookingId', isAuthenticated, Booking.deleteBooking);

export default router;
