import express from 'express';
import ctrl from './user.ctrl';

const router = express.Router();
const {
  index, show, destroy, create, update
} = ctrl;

router.get('/', index);
router.get('/:id', show);
router.delete('/:id', destroy);
router.post('/', create);
router.put('/:id', update);

export default router;