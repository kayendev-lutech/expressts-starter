import { Router } from 'express';
import { VariantController } from './controller/variant.controller.js';

const router = Router();
const controller = new VariantController();

router.get('/', (req, res, next) =>
  controller.getAll(req).then((data: unknown) => res.json(data)).catch(next)
);
router.get('/:id', (req, res, next) =>
  controller.getById(req).then((data: unknown) => res.json(data)).catch(next)
);
router.post('/', (req, res, next) =>
  controller.create(req).then((data: unknown) => res.json(data)).catch(next)
);
router.put('/:id', (req, res, next) =>
  controller.update(req).then((data: unknown) => res.json(data)).catch(next)
);
router.delete('/:id', (req, res, next) =>
  controller.delete(req).then((data: unknown) => res.json(data)).catch(next)
);

export default router;