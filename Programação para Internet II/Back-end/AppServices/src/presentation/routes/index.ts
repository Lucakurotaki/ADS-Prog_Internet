import {Router} from 'express';

import serviceRouts from './ServiceRoutes'
import commentRoutes from './CommentRoutes'

const router = Router();

router.use('/services', serviceRouts);
router.use('/comments', commentRoutes);

export default router;