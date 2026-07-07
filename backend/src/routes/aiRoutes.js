import express from 'express';
import { generateListingHighlight } from '../controllers/aiController.js';

const router = express.Router();

router.post('/listing-highlight', generateListingHighlight);

export default router;