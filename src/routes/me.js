import express from 'express';
const router = express.Router();
import meController from '../app/controllers/MeController.js';

router.get('/stored/courses', meController.storeCourses);
router.get('/trash/courses', meController.trashCourses);

export default router;