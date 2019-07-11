import { Router } from 'express';
import Trip from '../controllers/trip.controller';
import isAuthenticated from '../utils/isAuthenticated';

const router = new Router();

router.post('/trips', Trip.createTrip);
router.get('/trips', isAuthenticated, Trip.getTrips);
router.patch('/trips/:tripId', isAuthenticated, Trip.cancelTrip);

export default router;
