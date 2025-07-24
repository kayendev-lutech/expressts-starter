import { Router } from 'express';
import { VariantController } from './controller/variant.controller.js';

const router = Router();
const controller = new VariantController();

/**
 * @swagger
 * /variant:
 *   get:
 *     summary: Lấy danh sách biến thể sản phẩm
 *     tags:
 *       - Variant
 *     responses:
 *       200:
 *         description: Danh sách biến thể sản phẩm
 */
router.get('/', (req, res, next) =>
  controller.getAll(req).then((data: unknown) => res.json(data)).catch(next)
);

/**
 * @swagger
 * /variant/{id}:
 *   get:
 *     summary: Lấy chi tiết biến thể sản phẩm
 *     tags:
 *       - Variant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID biến thể
 *     responses:
 *       200:
 *         description: Thông tin biến thể sản phẩm
 */
router.get('/:id', (req, res, next) =>
  controller.getById(req).then((data: unknown) => res.json(data)).catch(next)
);

/**
 * @swagger
 * /variant:
 *   post:
 *     summary: Tạo mới biến thể sản phẩm
 *     tags:
 *       - Variant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Biến thể đã được tạo
 */
router.post('/', (req, res, next) =>
  controller.create(req).then((data: unknown) => res.json(data)).catch(next)
);

/**
 * @swagger
 * /variant/{id}:
 *   put:
 *     summary: Cập nhật biến thể sản phẩm
 *     tags:
 *       - Variant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID biến thể
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Biến thể đã được cập nhật
 */
router.put('/:id', (req, res, next) =>
  controller.update(req).then((data: unknown) => res.json(data)).catch(next)
);

/**
 * @swagger
 * /variant/{id}:
 *   delete:
 *     summary: Xóa biến thể sản phẩm
 *     tags:
 *       - Variant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID biến thể
 *     responses:
 *       200:
 *         description: Biến thể đã được xóa
 */
router.delete('/:id', (req, res, next) =>
  controller.delete(req).then((data: unknown) => res.json(data)).catch(next)
);

export default router;