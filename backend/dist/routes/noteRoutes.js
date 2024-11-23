import express from 'express';
import { createNoteController, getAllNotesController, deleteNoteController } from '../controller/noteController.js';
import { requireSignIn } from '../middleware/authMiddleware.js';
const router = express.Router();
router.post('/create', requireSignIn, createNoteController);
router.get('/all', requireSignIn, getAllNotesController);
router.delete('/delete/:id', requireSignIn, deleteNoteController);
export default router;
//# sourceMappingURL=noteRoutes.js.map