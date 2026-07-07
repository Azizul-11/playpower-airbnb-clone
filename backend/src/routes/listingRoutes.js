import express from 'express';
import { getListingDetails } from '../controllers/listingController.js';

const router = express.Router();

router.get('/current', getListingDetails);

export default router;